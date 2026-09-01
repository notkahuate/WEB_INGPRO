# Backend Strapi 4 — Panel CMS INGPRO

Panel para **editar productos, clientes y cotizaciones** desde el navegador.  
Zoho y lógica de negocio siguen en `backend/` (Express).

## Qué incluye

- **Strapi 4.25.23**
- Content types: `Producto`, `Cliente`, `Cotizacion`
- API compatible con el frontend: `GET /api/products`
- Scripts para importar desde SQL

## Instalación (primera vez)

**Recomendado:** Node **18 o 20** (Strapi 4 no soporta oficialmente Node 22).

```powershell
cd backend-strapi
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm install
npm rebuild better-sqlite3
npm run develop
```

Abre `http://localhost:1337/admin` y crea tu usuario admin (si es la primera vez).

## Importar datos desde SQL

```powershell
npm run import:products -- data/productos.sql
```

O importar productos + clientes + cotizaciones:

```powershell
npm run import:sql -- data/rqzyijcx_INGPRO.sql
```

## Base de datos

En `.env`:

- **Local:** `DATABASE_CLIENT=sqlite` (por defecto)
- **Banahosting:** `DATABASE_CLIENT=mysql` con tus credenciales

## Producción (Banahosting)

1. Sube la carpeta `backend-strapi` (sin `node_modules`)
2. En cPanel → **Setup Node.js App**
3. Node 18 o 20
4. `npm install` → `npm run build` → `npm run start`
5. URL admin: la que te asigne cPanel + `/admin`

## Puertos

| Servicio | Puerto |
|----------|--------|
| Backend Express (Zoho, login, etc.) | 3000 |
| Strapi CMS | 1337 |
