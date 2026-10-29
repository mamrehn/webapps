/* Overview page: renders the catalog (apps.js) with the generated efforts
   (efforts.js) as cards or table, with search, filters and sorting. */
(() => {
  const apps = window.APPS || [];
  const levels = window.MATURITY_LEVELS || [];
  const effortData = window.EFFORTS || { apps: {} };
  const pictograms = window.PICTOGRAMS || {};
  const NBSP = ' ';
  const AUDIENCE = { student: 'Lernende', teacher: 'Lehrkräfte' };
  const VIEW_KEY = 'webapps-view';

  // Material icons "school" and "co_present"
  const AUDIENCE_ICON = {
    student: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>',
    teacher: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h2v-2H3V5h18v8h2V5c0-1.11-.9-2-2-2zm-8 7c0-1.65-1.35-3-3-3S7 8.35 7 10s1.35 3 3 3 3-1.35 3-3zm-3 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 3.43c0-1.65-3.33-2.43-6-2.43s-6 .78-6 2.43V16h12v-1.57zM6.48 14c.74-.48 2.22-1 3.52-1s2.77.49 3.52 1H6.48zM22 15h-2v2h2v-2zm-2-6h2v4h-2V9z"/></svg>'
  };

  const ICON_INSTALL = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>';
  const ICON_EXPAND = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>';
  const ICON_OPEN = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>';

  const $ = (id) => document.getElementById(id);
  const effortOf = (app) => effortData.apps[app.id];
  const levelOf = (app) => levels[Math.min(5, Math.max(1, Math.floor(app.maturity))) - 1];
  const isGitHub = (url) => url.startsWith('https://github.com/');

  /* --- German formats ------------------------------------------- */
  const number = (n, digits) => n.toLocaleString('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const maturityText = (m) => number(m, Number.isInteger(m) ? 0 : 1);

  // Full hours, rounded half up; below one hour in steps of 5 minutes.
  function formatHours(hours) {
    const minutes = Math.max(5, Math.round(hours * 12) * 5);
    if (minutes < 60) return `~${minutes}${NBSP}min`;
    return `~${number(Math.round(hours), 0)}${NBSP}h`;
  }

  const sessionsText = (n) => `${n}${NBSP}${n === 1 ? 'Sitzung' : 'Sitzungen'}`;

  // How the effort is estimated — shown on mouseover, with the parameters
  // extract_efforts.py used (effort_config.json)
  const model = effortData.model;
  const EFFORT_HINT = model
    ? `Geschätzt aus der Git-Historie: Commits, die höchstens ${model.streak_threshold_minutes}${NBSP}Minuten auseinanderliegen, bilden eine Sitzung. Jede Sitzung zählt von ihrem ersten bis zu ihrem letzten Commit, dazu ${model.pre_streak_minutes}${NBSP}Minuten davor und ${model.post_streak_minutes}${NBSP}Minuten danach. Die Entwicklungszeit ist die Summe aller Sitzungen.`
    : '';

  function explainEffort(node) {
    if (EFFORT_HINT) {
      node.title = EFFORT_HINT;
      node.classList.add('hint');
    }
    return node;
  }

  /* --- DOM helpers ----------------------------------------------- */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function audienceBadge(audience, short) {
    const badge = el('span', `badge ${audience}`);
    badge.innerHTML = AUDIENCE_ICON[audience];
    badge.append(short ? AUDIENCE[audience] : `Für ${AUDIENCE[audience]}`);
    return badge;
  }

  function maturityMeter(maturity) {
    const meter = el('span', 'maturity-meter');
    meter.setAttribute('aria-hidden', 'true'); // the text next to it carries the value
    for (let step = 0; step < 5; step++) {
      const fill = el('span', 'maturity-fill');
      fill.style.width = `${Math.round(Math.min(1, Math.max(0, maturity - step)) * 100)}%`;
      const box = el('span', 'maturity-step');
      box.append(fill);
      meter.append(box);
    }
    return meter;
  }

  // Pictogram (STYLEGUIDE § 5.7) — decorative, the name next to it carries the meaning
  function pictogram(app, variant = '') {
    const markup = pictograms[app.id];
    return markup ? `<svg class="pictogram ${variant}" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${markup}</svg>` : '';
  }

  function openLink(app, className, href = app.url) {
    const link = el('a', className);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }

  /* --- Card view --------------------------------------------------
     While browsing a tile shows what helps choosing: name, kind,
     audience, the one-line summary and the maturity level. „Details“
     swaps in the full description and adds the numbers.            */
  function renderCard(app, headingTag) {
    const effort = effortOf(app);
    const level = levelOf(app);
    const titleId = `app-${app.id}-title`;

    const card = el('article', 'card app-card');
    card.setAttribute('aria-labelledby', titleId);
    const body = el('div', 'app-card-body');

    // Pictogram left of the title: tells the tiles apart at a glance
    const head = el('div', 'card-header');
    head.innerHTML = pictogram(app);
    const heading = el('div');
    const title = el(headingTag, 'card-title', app.title);
    title.id = titleId;
    heading.append(title, el('p', 'card-subtitle', app.kind));
    head.append(heading);

    const tags = el('div', 'app-card-tags');
    app.audience.forEach((a) => tags.append(audienceBadge(a)));
    if (!app.url) tags.append(el('span', 'badge tag', 'In Entwicklung'));

    const desc = el('p', 'app-card-desc', app.description);
    desc.id = `app-${app.id}-desc`;
    const summary = app.summary ? el('p', 'app-card-desc', app.summary) : null;
    if (summary) {
      summary.id = `app-${app.id}-summary`;
      desc.hidden = true;
    }

    const maturity = el('p', 'maturity');
    maturity.append(maturityMeter(app.maturity), level.name);

    const facts = el('dl', 'kv app-card-facts');
    facts.id = `app-${app.id}-facts`;
    facts.hidden = true;
    facts.append(
      el('dt', '', 'Reifegrad'),
      el('dd', '', `${maturityText(app.maturity)} von 5 – ${level.name}`),
      explainEffort(el('dt', '', 'Entwicklungszeit')),
      el('dd', '', effort ? `${formatHours(effort.hours)} in ${sessionsText(effort.sessions)}` : 'keine Daten'));
    if (app.installNote) facts.append(el('dt', '', 'Installation'), el('dd', '', app.installNote));

    body.append(head, tags, ...(summary ? [summary] : []), desc, maturity, facts);

    const toggle = el('button', 'btn ghost small app-card-toggle', 'Details');
    toggle.type = 'button';
    toggle.insertAdjacentHTML('beforeend', ICON_EXPAND);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', summary ? `${summary.id} ${desc.id} ${facts.id}` : facts.id);
    toggle.append(el('span', 'visually-hidden', ` zu ${app.title}`));
    toggle.addEventListener('click', () => {
      const expand = facts.hidden;
      facts.hidden = !expand;
      if (summary) {
        summary.hidden = expand;
        desc.hidden = !expand;
      }
      toggle.setAttribute('aria-expanded', String(expand));
    });

    const footer = el('div', 'app-card-actions');
    footer.append(toggle);
    if (app.install) {
      // Userscript: installing is the main action, the repository comes second
      const links = el('span', 'cluster');
      const repo = openLink(app, 'btn ghost small');
      repo.innerHTML = `GitHub ${ICON_OPEN}`;
      repo.append(el('span', 'visually-hidden', `: ${app.title} (neues Fenster)`));
      const install = openLink(app, 'btn secondary small', app.install);
      install.innerHTML = `${ICON_INSTALL} Installieren`;
      install.append(el('span', 'visually-hidden', `: ${app.title} (Userscript, neues Fenster)`));
      links.append(repo, install);
      footer.append(links);
    } else if (app.url) {
      const link = openLink(app, 'btn secondary small');
      link.innerHTML = `${isGitHub(app.url) ? 'Auf GitHub ansehen' : 'App öffnen'} ${ICON_OPEN}`;
      link.append(el('span', 'visually-hidden', `: ${app.title} (neues Fenster)`));
      footer.append(link);
    } else {
      footer.append(el('span', 'app-card-note', 'Noch nicht veröffentlicht'));
    }

    card.append(body, footer);
    return card;
  }

  /* --- Table view -------------------------------------------------- */
  function renderRow(app) {
    const effort = effortOf(app);
    const level = levelOf(app);
    const row = el('tr');

    const name = el('th');
    name.scope = 'row';
    const label = el('span', 'pictogram-label');
    label.innerHTML = pictogram(app, 'small');
    const text = el('span');
    if (app.url) {
      const link = openLink(app);
      link.textContent = app.title;
      link.append(el('span', 'visually-hidden', ' (neues Fenster)'));
      text.append(link);
      if (app.install) {
        const install = openLink(app, 'install-link', app.install);
        install.textContent = 'Installieren';
        install.append(el('span', 'visually-hidden', `: ${app.title} (Userscript, neues Fenster)`));
        text.append(' ', install);
      }
    } else {
      text.append(app.title, ' ', el('span', 'badge tag', 'In Entwicklung'));
    }
    label.append(text);
    name.append(label);

    // Bar and level name only — the exact value is in the card's „Details“
    const maturity = el('td');
    const cell = el('span', 'maturity-cell');
    cell.append(maturityMeter(app.maturity), level.name);
    maturity.append(cell);

    const audience = el('td');
    const badges = el('span', 'audience-cell');
    badges.append(...app.audience.map((a) => audienceBadge(a, true)));
    audience.append(badges);

    row.append(
      name,
      el('td', '', app.kind),
      audience,
      maturity,
      el('td', 'numeric', effort ? formatHours(effort.hours) : '–'),
      el('td', 'numeric', effort ? String(effort.sessions) : '–')
    );
    return row;
  }

  /* --- Filter, sort, render ---------------------------------------- */
  const state = { query: '', audience: 'all', minMaturity: 0, sort: 'curated', view: 'cards' };

  const hoursOf = (app) => effortOf(app)?.hours ?? -1;
  const lastOf = (app) => effortOf(app)?.last ?? '';
  const SORTS = {
    curated: () => 0,
    maturity: (a, b) => b.maturity - a.maturity || hoursOf(b) - hoursOf(a),
    hours: (a, b) => hoursOf(b) - hoursOf(a),
    recent: (a, b) => lastOf(b).localeCompare(lastOf(a)),
    title: (a, b) => a.title.localeCompare(b.title, 'de')
  };

  function matches(app) {
    if (state.audience !== 'all' && !app.audience.includes(state.audience)) return false;
    if (app.maturity < state.minMaturity) return false;
    if (!state.query) return true;
    const text = [app.title, app.kind, app.summary, app.description, levelOf(app).name].join(' ').toLowerCase();
    return state.query.split(/\s+/).every((word) => text.includes(word));
  }

  // Deliberately small tools are listed separately, in cards and table alike,
  // so a high maturity reads as "does its one job well", not "has it all".
  function groupRow(text) {
    const row = el('tr', 'table-group');
    const cell = el('th', '', text);
    cell.scope = 'rowgroup';
    cell.colSpan = 6;
    row.append(cell);
    return row;
  }

  function render() {
    const shown = apps.filter(matches).sort(SORTS[state.sort]);
    const main = shown.filter((app) => !app.compact);
    const small = shown.filter((app) => app.compact);
    const [mainRows, smallRows] = $('appTable').tBodies;

    $('appGrid').replaceChildren(...main.map((app) => renderCard(app, 'h3')));
    $('smallGrid').replaceChildren(...small.map((app) => renderCard(app, 'h4')));
    mainRows.replaceChildren(...main.map(renderRow));
    smallRows.replaceChildren(...(small.length ? [groupRow('Kleine Werkzeuge'), ...small.map(renderRow)] : []));

    const empty = shown.length === 0;
    const cards = state.view === 'cards';
    $('appGrid').hidden = !cards || main.length === 0;
    $('smallGroup').hidden = !cards || small.length === 0;
    $('appTableCard').hidden = empty || cards;
    $('noResults').hidden = !empty;
    $('resultCount').textContent = shown.length === apps.length
      ? `${apps.length} Apps`
      : `${shown.length} von ${apps.length} Apps`;
  }

  function renderStatic() {
    // The hidden table caption reads it out; visible labels get a mouseover
    if (EFFORT_HINT) document.querySelectorAll('[data-effort-hint]').forEach((node) => {
      if (node.tagName === 'CAPTION') node.append(`. ${EFFORT_HINT}`);
      else explainEffort(node);
    });

    const effortsOf = apps.map(effortOf).filter(Boolean);
    const totalHours = effortsOf.reduce((sum, e) => sum + e.hours, 0);
    const totalSessions = effortsOf.reduce((sum, e) => sum + e.sessions, 0);
    const forStudents = apps.filter((a) => a.audience.includes('student')).length;
    const forTeachers = apps.filter((a) => a.audience.includes('teacher')).length;

    $('kpiApps').textContent = apps.length;
    $('kpiAppsContext').textContent = `${forStudents} für Lernende, ${forTeachers} für Lehrkräfte`;
    $('kpiMature').textContent = apps.filter((a) => a.maturity >= 4).length;
    $('kpiHours').textContent = `~${number(Math.round(totalHours), 0)}`;
    $('kpiHoursContext').textContent = effortData.generated
      ? `in ${sessionsText(totalSessions)}, Stand ${window.B3.fmt.date(effortData.generated)}`
      : `in ${sessionsText(totalSessions)}`;

    $('levelList').replaceChildren(...levels.map((level) => {
      const item = el('li', 'level-item');
      const text = el('div');
      text.append(el('strong', '', `${level.level} – ${level.name}`), el('p', '', level.text));
      item.append(maturityMeter(level.level), text);
      return item;
    }));
  }

  function setView(view) {
    state.view = view === 'table' ? 'table' : 'cards';
    $('viewToggle').querySelectorAll('button').forEach((btn) =>
      btn.setAttribute('aria-pressed', String(btn.value === state.view)));
    try { localStorage.setItem(VIEW_KEY, state.view); } catch (e) { /* private mode */ }
  }

  function init() {
    renderStatic();
    try { setView(localStorage.getItem(VIEW_KEY)); } catch (e) { setView('cards'); }

    $('search').addEventListener('input', (e) => {
      state.query = e.target.value.trim().toLowerCase();
      render();
    });
    $('audienceFilter').addEventListener('b3:change', () => {
      state.audience = $('audienceFilter').querySelector('[aria-pressed="true"]').dataset.audience;
      render();
    });
    $('minMaturity').addEventListener('change', (e) => {
      state.minMaturity = Number(e.target.value);
      render();
    });
    $('sortBy').addEventListener('change', (e) => {
      state.sort = e.target.value;
      render();
    });
    $('viewToggle').addEventListener('b3:change', (e) => {
      setView(e.detail.value);
      render();
    });
    $('resetFilters').addEventListener('click', () => {
      $('search').value = '';
      $('minMaturity').value = '0';
      $('audienceFilter').querySelectorAll('.pill').forEach((p) =>
        p.setAttribute('aria-pressed', String(p.dataset.audience === 'all')));
      Object.assign(state, { query: '', audience: 'all', minMaturity: 0 });
      render();
      $('search').focus();
    });

    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
