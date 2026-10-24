# Sikick public website

Standalone public marketing website for Sikick. This project is intentionally separate from the IMS console repository.

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Configuration

Copy `.env.example` to `.env` and set the public URLs. Auth, billing and email are owned by the deployed Sikick app and are linked to, not implemented here.
