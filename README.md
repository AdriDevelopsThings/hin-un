# hin-un
A web application that can resolve hazard identification numbers and un numbers to their meaning. The meaning is currently only in german.

Optionally, signing in with Mastodon unlocks a personal history of found substances and a friends comparison — entirely opt-in via the small account icon in the corner; the core lookup tool works the same without it.

## Configuration

- `PUBLIC_API_BASE_URL` (build-time env var, e.g. in a `.env` file): base URL of the backend API. Defaults to `/api`, i.e. same-origin behind a reverse-proxy path. Set it to a full URL (e.g. `https://api.example.com`) if the API is hosted on a different origin — the backend must then allow CORS with credentials, and its session cookie must be set with `SameSite=None; Secure`.