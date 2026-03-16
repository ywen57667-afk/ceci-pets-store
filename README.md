# ceci-pets-store

## Run

This project now includes a real backend login API (SQLite + cookie session) and static pages.

```bash
python3 app.py
```

Open:

- `http://127.0.0.1:4179`

## Demo auth notes

- Register + login are backed by `auth.db` (SQLite).
- Session is stored in an HTTP-only cookie.
- This is a lightweight demo auth suitable for local dev.
