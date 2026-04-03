# Sevastu App — Setup & Deployment

## Prerequisites

- Node.js 18+ recommended (Expo 52)
- For device builds: Xcode (iOS), Android Studio / SDK (Android)
- Expo CLI via `npx expo`

## Install

```bash
cd Sevastu-app
npm install
```

## Development

```bash
npx expo start
```

Then press `i` / `a` for simulator, or scan QR in Expo Go.

## Run on native projects

```bash
npm run ios
npm run android
```

(Requires prebuild / dev client if you add native modules beyond Expo defaults.)

## Configuration checklist (production)

1. **API URL** — Point `apiClient` `baseURL` at your deployed Sevastu-be (use env + `expo-constants` or `app.config.js` `extra`).
2. **JWT persistence** — Store `accessToken` after login; implement `getToken()` in `apiClient.ts`.
3. **Response parsing** — Unwrap `response.data.data` consistently.
4. **Chat payload** — Use `message` key to match `SendMessageDto`.
5. **Jobs** — Include `price` in create payload.

## Environment / secrets

Do not commit API keys. Use EAS Secrets or `.env` with `expo-env` patterns for Google OAuth if you add native Google Sign-In later.

## Build (EAS — typical)

```bash
npx eas build --platform ios
npx eas build --platform android
```

(EAS project must be configured; not committed in this repo by default.)

## Related docs

- [OVERVIEW.md](./OVERVIEW.md)
- [API-INTEGRATION.md](./API-INTEGRATION.md)
