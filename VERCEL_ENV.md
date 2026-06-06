# Variables de entorno para Vercel

Copia y pega cada una en: Vercel Dashboard → tu proyecto → Settings → Environment Variables

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kzaltojzltphdmqkzttc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(tu anon key de Supabase)* |
| `SUPABASE_SERVICE_ROLE_KEY` | *(tu service role key — marcar como Sensitive)* |
| `NEXT_PUBLIC_GUMROAD_PRODUCT_URL` | `https://johansebas0.gumroad.com/l/kpwmex` |
| `GUMROAD_WEBHOOK_SECRET` | *(tu token secreto — marcar como Sensitive)* |
| `ANTHROPIC_API_KEY` | *(tu API key de Anthropic — marcar como Sensitive)* |
| `NEXT_PUBLIC_APP_URL` | `https://tu-proyecto.vercel.app` *(poner el dominio real)* |

## Configuración Supabase — Auth

En Supabase Dashboard → Authentication → URL Configuration:

- **Site URL**: `https://tu-proyecto.vercel.app`
- **Redirect URLs**: `https://tu-proyecto.vercel.app/auth/callback`

## Configuración Gumroad Webhook

En Gumroad → Settings → Advanced → Ping URL:
```
https://tu-proyecto.vercel.app/api/gumroad/webhook?token=TU_GUMROAD_WEBHOOK_SECRET
```
