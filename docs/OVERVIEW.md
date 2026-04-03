# Sevastu App (Mobile) — Overview

**Package name:** `sevastu-app`  
**Stack:** Expo ~52, React Native 0.76, React 18, React Navigation (native stack + bottom tabs).

## Product role

Customer-facing mobile client for the Sevastu marketplace: explore workers, book services, manage bookings, chat (when integrated), and authenticate via phone OTP (and optional email/password flows supported by the API).

## Navigation

**Stack** (`AppNavigator.tsx`), simplified order:

1. `Splash` → `RoleSelection` → `Login` → `VerifyOtp` → `SetPassword` (optional) → `Main` (tabs)
2. Modal/stack screens: `WorkerProfile`, `Booking`, `Chat`

**Tabs (`Main`):**

| Tab | Screen | Notes |
|-----|--------|--------|
| Explore | `HomeScreen` | |
| Search | `SearchScreen` | |
| Bookings | `BookingsScreen` | |
| Chat | Placeholder (`ChatListScreen`) | Copy directs users to book first |
| Profile | `ProfileScreen` | |

## Theming

`src/theme` — shared colors/typography; UI primitives under `src/components/ui/`.

## Key source folders

```
src/
  navigation/    # AppNavigator
  screens/       # Feature screens
  services/      # API clients (auth, jobs, workers, chat)
  components/    # Reusable UI
```

## Related docs

- [API-INTEGRATION.md](./API-INTEGRATION.md)
- [SETUP-AND-DEPLOYMENT.md](./SETUP-AND-DEPLOYMENT.md)
