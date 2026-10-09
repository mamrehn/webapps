import json
import os

def format_hours(h):
    return f"{round(h)}"

def count_sessions(daily_work):
    return len(daily_work)

try:
    with open('efforts.json', 'r') as f:
        data = json.load(f)
    
    repos = data.get('repositories', {})
    summary = {}
    for name, repo in repos.items():
        hours = repo.get('total_hours', 0)
        sessions = 0
        users = repo.get('users', {})
        if 'mamrehn' in users:
            sessions = count_sessions(users['mamrehn'].get('daily_work', {}))
        summary[name] = {'hours': hours, 'sessions': sessions}
    
    print(json.dumps(summary, indent=2))
except Exception as e:
    print(f"Error: {e}")
