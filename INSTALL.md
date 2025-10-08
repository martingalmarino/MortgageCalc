# 📦 Instrucciones de Instalación

## Instalación Rápida (3 minutos)

### 1️⃣ Instalar Dependencias

```bash
cd "/Users/martingalmarino/Desktop/Mortgage Calculator"
npm install
```

Esto instalará:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
- Y todas las dependencias necesarias

### 2️⃣ Ejecutar en Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

Se redirigirá automáticamente a: **http://localhost:3000/cz/hypotecni-kalkulacka/praha**

### 3️⃣ Verificar que Todo Funciona

Abre tu navegador y verifica:
- ✅ La calculadora carga correctamente
- ✅ Puedes ingresar valores en los inputs
- ✅ Al hacer clic en "Vypočítat splátku" se muestran los resultados
- ✅ Los resultados son correctos
- ✅ Puedes navegar entre ciudades con los pills
- ✅ El FAQ accordion se abre y cierra
- ✅ El diseño es responsive en móvil

### 4️⃣ Build de Producción

```bash
npm run build
```

Esto generará:
- 18 páginas estáticas (una por ciudad)
- Optimización de CSS y JavaScript
- Archivos listos para deployment

### 5️⃣ Ejecutar en Producción (Local)

```bash
npm start
```

Esto ejecutará el servidor de producción localmente para testing.

---

## Verificación Automática

Puedes usar el script de validación:

```bash
./validate.sh
```

Este script verificará:
- ✅ Node.js y npm instalados
- ✅ Todos los archivos críticos presentes
- ✅ Build de producción exitoso

---

## Troubleshooting

### Error: "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"

```bash
# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9

# O usar otro puerto
PORT=3001 npm run dev
```

### Estilos no cargan

Verifica que el servidor esté corriendo y recarga la página con:
- Mac: `Cmd + Shift + R`
- Windows/Linux: `Ctrl + Shift + R`

### TypeScript Errors

```bash
# Limpiar y rebuildar
rm -rf .next
npm run build
```

---

## Estructura de URLs

Una vez instalado y corriendo, estas son las URLs disponibles:

**Páginas de Ciudades:**
- http://localhost:3000/cz/hypotecni-kalkulacka/praha
- http://localhost:3000/cz/hypotecni-kalkulacka/brno
- http://localhost:3000/cz/hypotecni-kalkulacka/ostrava
- http://localhost:3000/cz/hypotecni-kalkulacka/plzen
- ... (14 ciudades más)

**Sitemap:**
- http://localhost:3000/sitemap.xml

**Homepage (redirige a Praha):**
- http://localhost:3000/

---

## Próximos Pasos

Una vez que todo funcione localmente:

1. **Customizar contenido** (opcional):
   - Editar textos en los componentes
   - Ajustar valores por defecto en `lib/mortgageCalc.ts`
   - Modificar ciudades en `lib/citiesCZ.ts`

2. **Deploy a Vercel**:
   - Ver `DEPLOYMENT.md` para instrucciones completas
   - O simplemente ejecutar: `vercel --prod`

3. **Conectar dominio**:
   - Configurar DNS en tu proveedor
   - Agregar dominio en Vercel dashboard

4. **Activar Analytics**:
   - Google Analytics
   - Vercel Analytics
   - Hotjar (opcional)

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev           # Ejecutar dev server

# Producción
npm run build         # Build para producción
npm start             # Ejecutar producción localmente

# Linting
npm run lint          # Verificar código

# Deployment
vercel                # Deploy preview
vercel --prod         # Deploy a producción
```

---

## Requisitos del Sistema

- **Node.js**: 18.0 o superior
- **npm**: 9.0 o superior
- **Sistema Operativo**: macOS, Linux, o Windows
- **Navegador**: Chrome, Firefox, Safari, Edge (últimas versiones)

---

## ¡Listo! 🎉

Tu calculadora hipotecaria está instalada y funcionando.

Para cualquier duda, consulta:
- `README.md` - Documentación completa
- `QUICKSTART.md` - Guía rápida
- `PROJECT_SUMMARY.md` - Resumen del proyecto
- `DEPLOYMENT.md` - Guía de deployment

