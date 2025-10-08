# ⚡ Guía de Inicio Rápido

## 🎯 Objetivo
Calculadora hipotecaria MVP para República Checa con SEO programático y diseño fintech inspirado en Taxfix.

## 🚀 Instalación y Ejecución (5 minutos)

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar en Desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 3. Build de Producción
```bash
npm run build
npm start
```

## 📁 Estructura Clave

```
├── components/          → Componentes React reutilizables
│   ├── CalculatorForm   → Formulario de entrada
│   ├── ResultSummary    → Resultados del cálculo
│   ├── CTACompareBanks  → Módulo de conversión
│   └── FAQAccordion     → FAQ con JSON-LD
├── lib/
│   ├── mortgageCalc.ts  → Lógica de cálculo hipotecario
│   └── citiesCZ.ts      → 18 ciudades para SEO
├── pages/
│   └── cz/hypotecni-kalkulacka/[city].tsx → Páginas dinámicas
└── styles/
    └── globals.css      → Estilos con Tailwind
```

## 🎨 Paleta de Colores (Taxfix-Inspired)

- **Primary**: `#0A7D77` (Teal)
- **Accent**: `#FFD166` (Warm Yellow)
- **Background**: `#F5F7FA`
- **Text**: `#1F2937` / `#4B5563`

## 🌐 URLs Generadas

El proyecto genera automáticamente páginas para 18 ciudades:

- `/cz/hypotecni-kalkulacka/praha`
- `/cz/hypotecni-kalkulacka/brno`
- `/cz/hypotecni-kalkulacka/ostrava`
- ... (15 más)

## ✅ Checklist Pre-Deployment

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` funciona correctamente
- [ ] Calculadora muestra resultados correctos
- [ ] Diseño responsive en móvil
- [ ] `npm run build` completa sin errores
- [ ] Todas las páginas de ciudades cargan

## 🚀 Deploy a Vercel

### Método más rápido:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

O importa el repositorio directamente desde GitHub en [vercel.com](https://vercel.com).

## 🧮 Fórmula de Cálculo

```javascript
monthlyPayment = P × r × (1+r)^n / ((1+r)^n - 1)
```

- **P**: Principal (precio - záloha)
- **r**: Tasa mensual (tasa anual / 12 / 100)
- **n**: Meses totales (años × 12)

## 🎯 Características Principales

✅ Calculadora hipotecaria funcional  
✅ 18 páginas SEO por ciudad  
✅ Diseño Taxfix-inspired  
✅ Mobile-first responsive  
✅ JSON-LD para SEO  
✅ CTA de conversión  
✅ FAQ accordion  
✅ Interlinking entre ciudades  
✅ Performance optimizado  

## 📊 Próximos Pasos (Post-MVP)

1. **Integración CNB**: Tasas de interés en tiempo real
2. **Analytics**: Google Analytics 4
3. **Tabla de Amortización**: Desglose mes a mes
4. **Comparador de Escenarios**: Múltiples hipotecas
5. **Export PDF**: Resultados descargables
6. **Sitemap XML**: Para mejor SEO

## 🐛 Problemas Comunes

### Error: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Estilos no cargan
- Verifica que `@/styles/globals.css` esté importado en `_app.tsx`

### Páginas 404
- Verifica que el archivo esté en la ruta correcta
- `npm run build` para regenerar páginas estáticas

## 📞 Soporte

Para preguntas o issues:
1. Revisa `README.md` para documentación completa
2. Revisa `DEPLOYMENT.md` para guía de deployment
3. Verifica logs en la consola del navegador

---

**¡Listo para producción!** 🎉

El proyecto está optimizado para Vercel y listo para recibir tráfico real.

