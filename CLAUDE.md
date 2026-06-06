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
- **IA**: Anthropic SDK en `src/lib/anthropic.ts`. Solo se invoca si `profiles.subscription_status === 'active'`. Modelo: `claude-sonnet-4-6`, max 300 tokens.

### Modelo de datos
Dos tablas en Supabase:
- `profiles` — extiende `auth.users`. Campos clave: `subscription_status` ('free'|'active'|'canceled'|'past_due'), `subscription_id` (ID de suscripción Gumroad).
- `checkins` — un registro por check-in. `reflexion_ia` es null para usuarios Free.

El trigger `on_auth_user_created` crea automáticamente una fila en `profiles` al registrarse.

### Flujo del check-in
`src/app/(app)/checkin/page.tsx` es un componente cliente con máquina de estados local (`emocion → intensidad → preguntas → resultado`). Al finalizar llama a `POST /api/checkin` que guarda en DB y, si el usuario es Pro, llama a Claude y actualiza `reflexion_ia`.

### Lógica Free vs Pro
La verificación de tier ocurre **solo en el servidor** (`/api/checkin/route.ts`). El cliente nunca decide si generar reflexión. El upsell aparece cuando `reflexion === null` en el resultado.

### Webhook de Gumroad
`/api/gumroad/webhook` recibe Pings de Gumroad (alta, renovación, cancelación). Seguridad: token secreto en query param (`?token=GUMROAD_WEBHOOK_SECRET`). Vinculación: busca el email del comprador en `auth.users` via `supabase.auth.admin.listUsers()` y actualiza el perfil. Si el campo `cancelled === 'true'`, pone `subscription_status = 'canceled'`.

**En Gumroad Panel**: Configurar la URL del Ping como `https://tuapp.com/api/gumroad/webhook?token=TU_SECRET`.

### Constantes
`src/lib/constants.ts` contiene 40+ emociones por categoría y el mapa `PREGUNTAS_POR_EMOCION` con 3 preguntas específicas por emoción.

## Variables de entorno
Ver `.env.local`. Claves requeridas: Supabase (3), Gumroad (2), Anthropic (1), App URL (1).

## Schema SQL
`supabase/migrations/001_initial_schema.sql` — ejecutar en Supabase Dashboard > SQL Editor antes de correr la app. El campo `stripe_customer_id` en el schema no se usa con Gumroad pero es inocuo; puedes omitirlo.
