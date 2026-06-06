# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev    # Servidor de desarrollo en localhost:3000
npm run build  # Build de producción
npm run lint   # ESLint
```

## Arquitectura

App Next.js 16 (App Router) con dos zonas de rutas:
- `src/app/(auth)/` — páginas públicas: `/login`, `/registro`
- `src/app/(app)/` — páginas protegidas: `/dashboard`, `/checkin`, `/cuenta`

El proxy en `src/proxy.ts` (Next.js 16 renombró `middleware` → `proxy`) redirige usuarios no autenticados fuera de `(app)/` y usuarios autenticados fuera de `(auth)/`. La función exportada se llama `proxy`, no `middleware`.

### Stack
- **Auth + DB**: Supabase (Postgres con RLS). Cliente browser: `src/lib/supabase/client.ts`; servidor con cookies SSR: `src/lib/supabase/server.ts`. `createServiceClient()` usa `SERVICE_ROLE_KEY` para bypassear RLS en API routes.
- **Pagos**: Gumroad. No hay SDK — el usuario hace clic en un link externo a Gumroad (`NEXT_PUBLIC_GUMROAD_PRODUCT_URL?email=...`). Gumroad envía un Ping (POST form-urlencoded) a `POST /api/gumroad/webhook?token=SECRET`. El webhook busca al usuario por email en `auth.users` via Admin API y actualiza `profiles.subscription_status`.
- **IA**: Google Gemini SDK en `src/lib/gemini.ts`. Modelo `gemini-1.5-flash`. Solo se invoca si `profiles.subscription_status === 'active'`. Función exportada: `generarReflexion()`.

### Modelo de datos
Dos tablas en Supabase:
- `profiles` — extiende `auth.users`. Campos clave: `subscription_status` ('free'|'active'|'canceled'|'past_due'), `subscription_id` (ID de suscripción Gumroad).
- `checkins` — un registro por check-in. `reflexion_ia` es null para usuarios Free.

El trigger `on_auth_user_created` crea automáticamente una fila en `profiles` al registrarse.

### Flujo del check-in
`src/app/(app)/checkin/page.tsx` — máquina de estados (`emocion → intensidad → preguntas → resultado`). Llama a `POST /api/checkin` → guarda en DB → si Pro, llama Gemini → actualiza `reflexion_ia`.

### Lógica Free vs Pro
Verificación solo en servidor (`/api/checkin/route.ts`). El upsell aparece cuando `reflexion === null`.

### Webhook Gumroad
`/api/gumroad/webhook` — Ping POST form-urlencoded. Busca usuario por email via `supabase.auth.admin.listUsers()`. `cancelled === 'true'` → `subscription_status = 'canceled'`.
URL en Gumroad: `https://tuapp.vercel.app/api/gumroad/webhook?token=TU_SECRET`

### Constantes
`src/lib/constants.ts` — 40+ emociones y `PREGUNTAS_POR_EMOCION` (3 preguntas por emoción).

## Variables de entorno
Ver `.env.example`. Claves requeridas: Supabase (3), Gumroad (2), Gemini (1), App URL (1).

## Schema SQL
`supabase/migrations/001_initial_schema.sql` — ya ejecutado en Supabase.
