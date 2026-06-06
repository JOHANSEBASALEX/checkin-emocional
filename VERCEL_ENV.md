# Variables de entorno para Vercel

Copia cada una en: Vercel Dashboard → tu proyecto → Settings → Environment Variables

| Variable | Valor | Tipo |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kzaltojzltphdmqkzttc.supabase.co` | Plain |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(tu anon key de Supabase)* | Plain |
| `SUPABASE_SERVICE_ROLE_KEY` | *(tu service role key)* | **Sensitive** |
| `NEXT_PUBLIC_GUMROAD_PRODUCT_URL` | `https://johansebas0.gumroad.com/l/kpwmex` | Plain |
| `GUMROAD_WEBHOOK_SECRET` | *(tu token secreto)* | **Sensitive** |
| `GEMINI_API_KEY` | *(tu API key de Google AI Studio)* | **Sensitive** |
| `NEXT_PUBLIC_APP_URL` | `https://tu-proyecto.vercel.app` | Plain |

## Configuración Supabase Auth (después del deploy)

En Supabase → Authentication → URL Configuration:
- **Site URL**: `https://tu-proyecto.vercel.app`
- **Redirect URLs**: `https://tu-proyecto.vercel.app/auth/callback`

## Configuración Gumroad Webhook (después del deploy)

En Gumroad → Settings → Advanced → Ping URL:
```
https://tu-proyecto.vercel.app/api/gumroad/webhook?token=TU_GUMROAD_WEBHOOK_SECRET
```
