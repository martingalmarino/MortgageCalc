#!/bin/bash

echo "🔍 Validando Hypoteční Kalkulačka MVP..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js instalado:${NC} $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm instalado:${NC} $(npm --version)"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json no encontrado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ package.json encontrado${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules no encontrado. Ejecutando npm install...${NC}"
    npm install
fi
echo -e "${GREEN}✅ Dependencias instaladas${NC}"

# Check critical files
echo ""
echo "📁 Verificando archivos críticos..."

files=(
    "pages/_app.tsx"
    "pages/_document.tsx"
    "pages/index.tsx"
    "pages/cz/hypotecni-kalkulacka/[city].tsx"
    "components/CalculatorForm.tsx"
    "components/CalculatorHero.tsx"
    "components/ResultSummary.tsx"
    "components/CTACompareBanks.tsx"
    "components/FAQAccordion.tsx"
    "components/CityPills.tsx"
    "lib/mortgageCalc.ts"
    "lib/citiesCZ.ts"
    "styles/globals.css"
    "tailwind.config.js"
    "tsconfig.json"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}  ✅ $file${NC}"
    else
        echo -e "${RED}  ❌ $file no encontrado${NC}"
        exit 1
    fi
done

echo ""
echo "🔨 Intentando build de producción..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
else
    echo -e "${RED}❌ Build falló${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 ¡Validación completa! El proyecto está listo.${NC}"
echo ""
echo "Próximos pasos:"
echo "  1. npm run dev  →  Ejecutar en desarrollo"
echo "  2. npm start    →  Ejecutar en producción (después de build)"
echo "  3. vercel       →  Deploy a Vercel"
echo ""

