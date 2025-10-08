# 🚀 Deployment Guide - Hypoteční Kalkulačka

Guía completa para desplegar la aplicación en Vercel.

## Preparación Pre-Deployment

### 1. Verificar que todo funciona localmente

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir http://localhost:3000 y verificar:
# - La calculadora funciona correctamente
# - Los resultados se muestran bien
# - La navegación entre ciudades funciona
# - El diseño es responsive
```

### 2. Build de producción local

```bash
# Construir para producción
npm run build

# Verificar que no hay errores de TypeScript o build
# Si hay errores, corregirlos antes de continuar

# Probar el build localmente
npm start

# Verificar en http://localhost:3000
```

## Deployment en Vercel (Recomendado)

### Opción A: Deployment desde Git (Recomendado)

#### 1. Subir código a GitHub

```bash
# Inicializar repositorio (si no está hecho)
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: Hypoteční Kalkulačka MVP"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/mortgage-calculator-cz.git

# Push al repositorio
git push -u origin main
```

#### 2. Importar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Add New Project"
3. Selecciona "Import Git Repository"
4. Autoriza Vercel para acceder a tu GitHub
5. Selecciona el repositorio `mortgage-calculator-cz`
6. Configuración automática:
   - **Framework Preset**: Next.js (detectado automáticamente)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
7. Haz clic en "Deploy"

#### 3. Variables de entorno (Opcional por ahora)

En el futuro, cuando integres APIs:
- Ve a Project Settings → Environment Variables
- Agrega: `CNB_API_KEY`, `NEXT_PUBLIC_GA_ID`, etc.

### Opción B: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## Post-Deployment

### 1. Verificar el deployment

Después del deployment, Vercel te dará una URL como:
- Preview: `https://mortgage-calculator-cz-xxx.vercel.app`
- Production: `https://mortgage-calculator-cz.vercel.app`

Verificar:
- ✅ Página principal carga correctamente
- ✅ Calculadora funciona
- ✅ Todas las páginas de ciudades son accesibles
- ✅ SEO meta tags están presentes
- ✅ Performance es buena (usa Lighthouse)

### 2. Conectar dominio personalizado

Si tienes un dominio (ej: `hypotecni-kalkulacka.cz`):

1. Ve a Project Settings → Domains
2. Agrega tu dominio
3. Configura DNS según las instrucciones de Vercel:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`
4. Espera la verificación (puede tomar hasta 24h)

### 3. Configurar SSL

Vercel provee SSL automáticamente. No necesitas hacer nada.

## Optimizaciones Post-Deployment

### Analytics

```bash
# Instalar Google Analytics
npm install @next/third-parties
```

Agregar en `pages/_app.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

// En el JSX
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

### Sitemap

Crear `pages/sitemap.xml.tsx`:

```tsx
import { GetServerSideProps } from 'next';
import { getAllCitySlugs } from '@/lib/citiesCZ';

function generateSiteMap(cities: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${cities
       .map((city) => {
         return `
       <url>
           <loc>https://hypotecni-kalkulacka.cz/cz/hypotecni-kalkulacka/${city}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const cities = getAllCitySlugs();
  const sitemap = generateSiteMap(cities);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function SiteMap() {}
```

### Monitoring

Vercel provee:
- **Analytics**: Métricas de tráfico
- **Speed Insights**: Core Web Vitals
- **Logs**: Para debugging

Accede desde el dashboard de Vercel.

## Troubleshooting

### Build falla

```bash
# Limpiar cache
rm -rf .next node_modules
npm install
npm run build
```

### Páginas 404

- Verifica que `getStaticPaths` incluya todas las ciudades
- Verifica que `fallback: false` en `getStaticPaths`

### Estilos no cargan

- Verifica que `globals.css` esté importado en `_app.tsx`
- Verifica configuración de Tailwind en `tailwind.config.js`

### Performance baja

- Optimiza imágenes (usa Next.js Image)
- Lazy load componentes pesados
- Reduce bundle size

## Continuous Deployment

Una vez conectado con GitHub:
- Cada push a `main` → deployment automático a producción
- Cada PR → preview deployment automático
- Rollback con un clic en Vercel dashboard

## Costos

- **Vercel Free Tier**: 
  - 100 GB bandwidth/mes
  - Unlimited requests
  - Ideal para MVP
  
- **Vercel Pro** ($20/mes):
  - Necesario cuando excedas el free tier
  - Más analytics y priority support

---

¡Listo! Tu calculadora hipotecaria está en producción 🎉

