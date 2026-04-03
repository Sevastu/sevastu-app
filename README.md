# Sevastu App

Expo / React Native customer app for the Sevastu marketplace (KaamSetu monorepo). It talks to **Sevastu-be** over HTTPS.

## Documentation

| Doc | Contents |
|-----|----------|
| [docs/OVERVIEW.md](./docs/OVERVIEW.md) | Stack, navigation, folder layout |
| [docs/API-INTEGRATION.md](./docs/API-INTEGRATION.md) | Endpoints, auth header, response shape, known gaps |
| [docs/SETUP-AND-DEPLOYMENT.md](./docs/SETUP-AND-DEPLOYMENT.md) | Install, dev server, production checklist |

## Quick start

```bash
npm install
npx expo start
```

## Backend

Point `src/services/apiClient.ts` at your API base URL and implement JWT retrieval in `getToken()` before relying on protected routes.
