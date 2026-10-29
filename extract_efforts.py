#!/usr/bin/env python3
"""
Estimate the development effort of every app on the overview page.

Reads the git history of the local repositories behind each app (no network
access), keeps only the own commits, merges duplicate clones and predecessor
repositories of an app, and writes efforts.js, which index.html loads.

Effort model (as in github.com/mamrehn/work_tracker): commits at most
streak_threshold_minutes apart form one work session; a session lasts from
its first to its last commit, plus pre_streak_minutes before and
post_streak_minutes after. The parameters and the author filter live in
effort_config.json.

Usage:
    python3 extract_efforts.py                    # repos next to this folder
    python3 extract_efforts.py --repos ~/repositories --output efforts.js

Run `git fetch` in a repository first if its local clone may be behind.
"""

import argparse
import json
import re
import subprocess
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

# App id (as in apps.js) -> sources: a repository folder below --repos, or a
# (folder, pathspec, ...) tuple to count only commits touching those paths.
# Commits are de-duplicated by hash, so clones of the same history count once,
# and sessions are merged across all sources of an app.
APP_SOURCES = {
    "pib3": [
        "b3_pib_inverse_kinematic_pip_package",
        "b3_pib_inverse_kinematic",  # predecessor pib_ik, renamed to pib3
    ],
    "flashcards": ["flashcards"],  # contains the history of taskcards
    "git": ["b3_git_webapp"],
    "styleguide": ["b3_it_styleguide_for_webapps"],
    "netzwerkdose": [("b3_3D_objects", "ethernet_cabeling", "netzwerkdose")],
    "zeugnis": ["zeugnis"],
    "vm": [
        "b3_vm_download",
        "b3_vm_config",  # builds the VM that the page offers for download
    ],
    "dashboard": ["dashboard"],
    "mebis-sync": ["b3_enhance_mebis"],
    "mebis-quiz-pdf": ["b3_print_mebis_quiz_results"],
    "webuntis-helfer": [("b3_violentmonkey_webuntis", "webuntis-lehrstoff-helper*", "webuntis-helper*")],
    "webuntis-raeume": [("b3_violentmonkey_webuntis", "webuntis-room-labels*")],
    "subnetting": ["b3_ipv4_subnetting"],
    "berufsschulpflicht": ["b3_rel_eth_pr"],
    "notenrechner": ["notenrechner"],
    "diffiefellows": ["diffiefellows"],
    "work-tracker": ["work_tracker"],
    "timers": ["timers"],
    "dual-llm": ["b3_finetuned_roleplay_llm"],
    "coode-vibes": ["b3_coode_vibes"],
}


def load_config(path):
    """Read effort_config.json: author filter and session model."""
    config = json.loads(path.read_text(encoding="utf-8"))
    return {
        "author": re.compile(config["author_pattern"], re.IGNORECASE),
        "gap": timedelta(minutes=config["streak_threshold_minutes"]),
        "pre": timedelta(minutes=config["pre_streak_minutes"]),
        "post": timedelta(minutes=config["post_streak_minutes"]),
        "minutes": {key: value for key, value in config.items() if key.endswith("_minutes")},
    }


def own_commits(repo_dir, paths, author):
    """Yield (sha, author date) of own commits on all branches, remotes and tags."""
    cmd = ["git", "-C", str(repo_dir), "log", "--branches", "--remotes", "--tags",
           "--format=%H%x00%an%x00%ae%x00%aI"]
    if paths:
        cmd += ["--", *paths]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    for line in result.stdout.splitlines():
        sha, name, email, date_str = line.split("\x00")
        if author.search(name) or author.search(email):
            yield sha, datetime.fromisoformat(date_str)


def work_sessions(dates, gap):
    """Group commit dates into [start, end] sessions."""
    sessions = []
    for d in sorted(dates):
        if sessions and d - sessions[-1][1] <= gap:
            sessions[-1][1] = d
        else:
            sessions.append([d, d])
    return sessions


def app_effort(repos_dir, sources, config):
    commits = {}
    for source in sources:
        repo, *paths = (source,) if isinstance(source, str) else source
        repo_dir = repos_dir / repo
        if not (repo_dir / ".git").exists():
            raise FileNotFoundError(f"not a git repository: {repo_dir}")
        commits.update(own_commits(repo_dir, paths, config["author"]))
    if not commits:
        return None

    dates = list(commits.values())
    sessions = work_sessions(dates, config["gap"])
    duration = sum(((end - start) + config["pre"] + config["post"] for start, end in sessions),
                   timedelta())
    return {
        "hours": round(duration.total_seconds() / 3600, 2),
        "sessions": len(sessions),
        "days": len({d.date() for d in dates}),
        "commits": len(commits),
        "first": min(dates).date().isoformat(),
        "last": max(dates).date().isoformat(),
    }


def catalog_ids(apps_js):
    """App ids listed in apps.js, to spot apps without effort mapping."""
    if not apps_js.exists():
        return None
    return set(re.findall(r"^\s*id:\s*'([^']+)'", apps_js.read_text(encoding="utf-8"), re.M))


def main():
    here = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[1])
    parser.add_argument("--repos", type=Path, default=here.parent,
                        help="folder that contains the app repositories (default: %(default)s)")
    parser.add_argument("--output", type=Path, default=here / "efforts.js",
                        help="generated file (default: %(default)s)")
    parser.add_argument("--config", type=Path, default=here / "effort_config.json",
                        help="author filter and session model (default: %(default)s)")
    args = parser.parse_args()
    config = load_config(args.config)

    efforts = {}
    for app_id, sources in APP_SOURCES.items():
        try:
            effort = app_effort(args.repos.expanduser(), sources, config)
        except (FileNotFoundError, subprocess.CalledProcessError) as e:
            print(f"Warning: {app_id}: {e}", file=sys.stderr)
            continue
        if effort:
            efforts[app_id] = effort

    known = catalog_ids(here / "apps.js")
    if known is not None:
        for app_id in sorted(known - APP_SOURCES.keys()):
            print(f"Warning: {app_id} is in apps.js but has no entry in APP_SOURCES", file=sys.stderr)
        for app_id in sorted(APP_SOURCES.keys() - known):
            print(f"Warning: {app_id} is in APP_SOURCES but not in apps.js", file=sys.stderr)

    data = {
        "generated": date.today().isoformat(),
        "model": config["minutes"],
        "apps": efforts,
    }
    args.output.write_text(
        "// Generated by extract_efforts.py, do not edit by hand.\n"
        f"window.EFFORTS = {json.dumps(data, indent=2, ensure_ascii=False)};\n",
        encoding="utf-8")

    print(f"{'App':22s} {'Stunden':>8s} {'Sitzungen':>9s} {'Tage':>5s} {'Commits':>7s}  Zeitraum")
    for app_id, e in sorted(efforts.items(), key=lambda x: -x[1]["hours"]):
        print(f"{app_id:22s} {e['hours']:8.1f} {e['sessions']:9d} {e['days']:5d} {e['commits']:7d}"
              f"  {e['first']} – {e['last']}")
    total = sum(e["hours"] for e in efforts.values())
    print(f"{'Summe':22s} {total:8.1f}\n\nWritten: {args.output}")


if __name__ == "__main__":
    main()
