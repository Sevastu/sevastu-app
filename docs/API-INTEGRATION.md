# Sevastu App — API Integration

## Base URL

`src/services/apiClient.ts` uses a fixed **`baseURL`**: `https://sevastu-be.onrender.com`.

For other environments, replace with `expo-constants` / `.env` pattern and rebuild.

## Auth header

`getToken()` currently returns **`null`** — the interceptor never attaches `Authorization`. **Production requirement:** read JWT from `AsyncStorage` / `expo-secure-store` after `verify-otp` or `login-email` and return it from `getToken()`.

## Backend response envelope

Sevastu-be returns:

```json
{ "success": true, "data": { ... }, "message": "..." }
```

Services often use `response.data` as if it were the inner payload. Prefer **`response.data.data`** for typed access, or normalize in one place.

## Service modules

### `src/services/authService.ts`

| Method | Endpoint | Body |
|--------|----------|------|
| `sendOtp` | POST `/auth/send-otp` | `{ phone }` |
| `verifyOtp` | POST `/auth/verify-otp` | `{ phone, otp }` |
| `setPassword` | POST `/auth/set-password` | `{ password }` + **Bearer** |
| `loginWithEmail` | POST `/auth/login-email` | `{ email, pass }` |

Expected token field in API response: **`accessToken`** (inside wrapped `data`).

### `src/services/workerService.ts`

- GET `/workers/nearby` — optional query `lat`, `lng`, `category`
- GET `/workers/:id`

### `src/services/jobService.ts`

- POST `/jobs` — body must include **`price`** (number) per server `CreateJobDto`; local TypeScript interface may omit it — **align before production**.
- GET `/jobs/my`

### `src/services/chatService.ts`

- GET `/chat/:jobId`
- POST `/chat/send` — server expects **`message`**; client currently sends **`text`** — **fix field name** or server DTO.

## 401 handling

Response interceptor shows “Session Expired” alert; wire navigation + token clear when auth is implemented.

## Related docs

- [OVERVIEW.md](./OVERVIEW.md)
- [SETUP-AND-DEPLOYMENT.md](./SETUP-AND-DEPLOYMENT.md)
