# 🥗 NutriPlan IA — Guía de instalación en tu celular

## Lo que necesitas (todo gratis, sin tarjeta)
- Una cuenta en **vercel.com**
- Una **API Key de Anthropic** (para el chat con IA)

---

## PASO 1 — Obtén tu API Key de Anthropic

1. Ve a **console.anthropic.com** desde tu computador
2. Crea una cuenta gratuita con tu email
3. Ve a **"API Keys"** en el menú izquierdo
4. Haz clic en **"Create Key"**
5. Copia la key (empieza con `sk-ant-...`) y guárdala en un lugar seguro
6. Anthropic da créditos gratis al inicio para empezar

---

## PASO 2 — Sube la app a Vercel

1. Ve a **vercel.com** y crea una cuenta gratuita
2. En el dashboard, haz clic en **"Add New → Project"**
3. Elige **"Deploy from your computer"** (o arrastra la carpeta)
4. **Sube la carpeta completa `nutriplan`** que te entregué
5. Vercel detectará automáticamente que es un proyecto Vite + React
6. Haz clic en **"Deploy"**
7. En 1-2 minutos tendrás una URL como: `nutriplan-tuapellido.vercel.app`

---

## PASO 3 — Instala en tu celular (se ve como app nativa)

### En iPhone (Safari):
1. Abre Safari y ve a tu URL de Vercel
2. Toca el ícono de **compartir** (cuadrado con flechita arriba)
3. Desplázate y toca **"Agregar a pantalla de inicio"**
4. Ponle nombre "NutriPlan" y toca **Agregar**
5. ¡Listo! Aparece en tu pantalla como cualquier app

### En Android (Chrome):
1. Abre Chrome y ve a tu URL de Vercel
2. Toca el menú (3 puntos arriba a la derecha)
3. Toca **"Agregar a pantalla de inicio"** o **"Instalar app"**
4. Confirma y ¡listo!

---

## PASO 4 — Configurar la API Key en la app

1. Abre la app desde tu pantalla de inicio
2. Toca el ícono 🔑 en la esquina superior derecha
3. Pega tu API Key de Anthropic
4. Toca **Guardar**
5. La key se guarda en tu dispositivo, no necesitas volver a ingresarla

---

## ¿Cuánto cuesta el chat?

El uso de la IA es muy económico. Una conversación típica de 10-20 mensajes cuesta menos de **$0.01 USD**. Con los créditos gratis iniciales de Anthropic tendrás para meses de uso normal.

---

## Estructura de archivos

```
nutriplan/
├── index.html          ← Entrada principal
├── package.json        ← Dependencias
├── vite.config.js      ← Configuración
├── public/
│   ├── manifest.json   ← Config para instalar como app
│   ├── icon-192.png    ← Ícono celular
│   └── icon-512.png    ← Ícono tablet
└── src/
    ├── main.jsx        ← Arranque React
    └── App.jsx         ← Toda la app
```

---

## ¿Problemas?

- **El chat no funciona:** Verifica que la API key esté bien ingresada (toca 🔑)
- **La app no se instala:** Asegúrate de usar Safari en iPhone o Chrome en Android
- **Error de Vercel:** Asegúrate de subir la carpeta completa, no archivos sueltos

---

*Hecho con ❤ — Tu plan personalizado de nutrición y entrenamiento*
