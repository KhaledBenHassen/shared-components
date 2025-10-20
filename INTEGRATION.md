# Futalis Shared Components - Integration Guide

## How It Works

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Stencil.js Component Library (futalis-shared-components)   │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │ TypeScript   │  ──────>│  Stencil     │                  │
│  │ + JSX        │         │  Compiler    │                  │
│  └──────────────┘         └──────────────┘                  │
│                                  │                           │
│                                  ▼                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │          Standard Web Components                    │    │
│  │  (Browser-native custom elements)                   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
┌──────────────┐              ┌──────────────┐
│  Vue 3       │              │  Nuxt 3      │
│  (CAPI)      │              │  (Shop)      │
└──────────────┘              └──────────────┘
        │                               │
        ▼                               ▼
   Uses custom                    Uses custom
   element tags                   element tags
   <futalis-header>               <futalis-header>
   <futalis-footer>               <futalis-footer>
```

### The Build Process

1. **Source Code**: You write components in TypeScript + JSX using Stencil decorators
2. **Stencil Compiler**: Compiles components to:
   - Standard Web Components (custom elements)
   - ES modules (for modern browsers)
   - CommonJS (for older bundlers)
   - TypeScript definitions
   - Loader scripts for lazy loading
3. **Distribution**: Components are packaged with multiple output targets:
   - `dist/components/` - Individual component files
   - `loader/` - Lazy loading wrapper
   - Types for TypeScript support

### How Components Load

```javascript
// 1. Import the loader in your app
import { defineCustomElements } from '@futalis/shared-components/loader'

// 2. Register components with the browser
defineCustomElements(window)

// 3. Now you can use them anywhere
<futalis-header></futalis-header>
```

**What happens:**
- `defineCustomElements()` tells the browser about new custom HTML tags
- Browser's Custom Elements API registers `<futalis-header>` and `<futalis-footer>`
- When these tags appear in HTML, the browser knows how to render them
- Components lazy-load only when needed (not all upfront)

### Framework Integration

Each framework needs to know these are custom elements (not framework components):

**Vue 3:**
```javascript
// Tell Vue compiler to ignore these tags
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('futalis-')
}
```

**Nuxt 3:**
```javascript
// In nuxt.config.ts
vue: {
  compilerOptions: {
    isCustomElement: (tag) => tag.startsWith('futalis-')
  }
}
```

**Next.js:**
- React already supports custom elements
- No special configuration needed

---

## Detailed Integration Steps

## Installation

### Option 1: Local Package (Development)

```bash
npm install ../futalis-shared-header-footer-poc
```

**What this does:**
- Creates a symlink in `node_modules/@futalis/shared-components`
- Points to your local component library
- Changes in component library require rebuild: `cd futalis-shared-header-footer-poc && npm run build`

### Option 2: NPM Package (Production - Future)

Once published to NPM:

```bash
npm install @futalis/shared-components
```

---

## Vue 3 + Vite Integration

### Step 1: Configure Vite

**File:** `vite.config.ts`

```typescript
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Tell Vue these are custom elements, not Vue components
          isCustomElement: (tag) => tag.startsWith('futalis-')
        }
      }
    })
  ],
  server: {
    fs: {
      allow: [
        '.',
        '../futalis-shared-header-footer-poc', // Allow Vite to serve files from component library
      ]
    }
  }
})
```

**Why this is needed:**
- Vue's template compiler needs to know which tags are custom elements
- Without this, Vue will treat them as Vue components and throw warnings
- The `fs.allow` lets Vite serve the component files from outside the project

### Step 2: Register Components in main.ts

**File:** `src/main.ts`

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// Import the loader
import { defineCustomElements } from '@futalis/shared-components/loader'

const app = createApp(App)

// Register custom elements with browser
defineCustomElements(window)

app.mount('#app')
```

**What this does:**
1. Imports the loader function
2. Calls `defineCustomElements(window)` which:
   - Registers `<futalis-header>` with browser's Custom Elements API
   - Registers `<futalis-footer>` with browser's Custom Elements API
   - Sets up lazy loading for component code
3. Components are now available throughout your app

### Step 3: Use in Components

**Simple Usage:**

```vue
<template>
  <div>
    <futalis-header @logo-click="handleLogoClick" />

    <main>
      <!-- Your content -->
    </main>

    <futalis-footer copyright-text="© 2025 futalis GmbH" />
  </div>
</template>

<script setup lang="ts">
const handleLogoClick = () => {
  console.log('Logo clicked')
}
</script>
```

**Advanced Usage with Dynamic Props:**

```vue
<template>
  <div>
    <futalis-header ref="headerRef" @logo-click="handleLogoClick" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const headerRef = ref<HTMLElement | null>(null)
const cartCount = ref(5)

// Update custom element properties directly
const updateHeaderProps = () => {
  if (headerRef.value) {
    const el = headerRef.value as any
    el.itemCount = cartCount.value
    el.userName = 'John Doe'
  }
}

onMounted(() => {
  updateHeaderProps()
})

watch(cartCount, () => {
  updateHeaderProps()
})

const handleLogoClick = () => {
  window.location.href = '/'
}
</script>
```

**Why the ref approach?**
- Web Components use properties (not attributes) for complex data
- Vue's `:prop` binding works for primitives but properties are more reliable
- Setting properties directly via ref ensures data is passed correctly

---

## Nuxt 3 Integration

### Step 1: Create Plugin

**File:** `plugins/stencil-components.client.ts`

```typescript
import { defineCustomElements } from '@futalis/shared-components/loader'

export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    defineCustomElements(window)
  }
})
```

**Why `.client.ts`?**
- Custom elements only work in the browser (not during SSR)
- `.client.ts` ensures this code only runs on client-side
- `typeof window !== 'undefined'` is extra safety

### Step 2: Configure Nuxt

**File:** `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('futalis-')
    }
  }
})
```

### Step 3: Use in Pages/Components

Same as Vue 3 example above.

---

## Next.js Integration

### Step 1: Create Client Component Wrapper

**File:** `components/FutalisHeader.tsx`

```typescript
'use client'

import { useEffect } from 'react'
import { defineCustomElements } from '@futalis/shared-components/loader'

export default function FutalisHeader({ onLogoClick }) {
  useEffect(() => {
    defineCustomElements(window)
  }, [])

  return (
    <futalis-header
      onLogoClick={onLogoClick}
    />
  )
}
```

**Why 'use client'?**
- Next.js uses React Server Components by default
- Custom elements need browser APIs
- `'use client'` marks this as a client component

### Step 2: Use in Pages

```typescript
import FutalisHeader from '@/components/FutalisHeader'
import FutalisFooter from '@/components/FutalisFooter'

export default function Layout({ children }) {
  const handleLogoClick = () => {
    console.log('Logo clicked')
  }

  return (
    <div>
      <FutalisHeader onLogoClick={handleLogoClick} />
      <main>{children}</main>
      <FutalisFooter />
    </div>
  )
}
```

---

## Understanding Props vs Attributes

### Attributes (String Values)

```vue
<!-- These work as HTML attributes -->
<futalis-header
  locale="en"
  home-url="/"
  faq-url="/faq"
/>
```

### Properties (Complex Data)

```javascript
// For arrays, objects, booleans - use properties
const headerEl = document.querySelector('futalis-header')
headerEl.itemCount = 5
headerEl.isLoggedIn = true
headerEl.menuItems = [{ name: 'Home', url: '/' }]
```

**In Vue, use ref:**
```vue
<script setup>
const headerRef = ref(null)
onMounted(() => {
  headerRef.value.itemCount = 5
  headerRef.value.menuItems = menuData.value
})
</script>

<template>
  <futalis-header ref="headerRef" />
</template>
```

---

## Events

### Emitting Events (Stencil Component)

```typescript
@Event() logoClick: EventEmitter<void>

private handleLogoClick = () => {
  this.logoClick.emit()
}
```

### Listening to Events (Vue)

```vue
<template>
  <futalis-header @logo-click="handleLogoClick" />
</template>

<script setup>
const handleLogoClick = () => {
  console.log('Logo clicked')
}
</script>
```

### Listening to Events (React)

```typescript
<futalis-header
  onLogoClick={() => console.log('Clicked')}
/>
```

### Listening to Events (Vanilla JS)

```javascript
const header = document.querySelector('futalis-header')
header.addEventListener('logoClick', (event) => {
  console.log('Logo clicked', event.detail)
})
```

---

## Current Components

### futalis-header

**Simplified POC Version:**

```vue
<futalis-header @logo-click="handleLogoClick" />
```

**Props:** None currently (simplified)

**Events:**
- `logo-click` - Emitted when logo is clicked

**Visual:**
- Green top bar
- Centered futalis® logo
- Responsive mobile/desktop layouts

### futalis-footer

**Simplified POC Version:**

```vue
<futalis-footer copyright-text="© 2025 futalis GmbH" />
```

**Props:**
- `copyright-text` (string) - Copyright text to display

**Events:** None currently (simplified)

**Visual:**
- Green top bar
- Centered copyright text
- Responsive mobile/desktop layouts

---

## Development Workflow

### 1. Make Changes to Components

```bash
cd futalis-shared-header-footer-poc/src/components/futalis-header
# Edit futalis-header.tsx or futalis-header.css
```

### 2. Rebuild Components

```bash
cd futalis-shared-header-footer-poc
npm run build
```

### 3. Changes Reflect in Apps

Since you're using local package (`npm install ../futalis-shared-header-footer-poc`):
- Refresh browser in consuming app (CAPI)
- Changes should appear immediately

### 4. For Dev Server with Hot Reload

```bash
cd futalis-shared-header-footer-poc
npm run start
```

Visit http://localhost:3333 to see components in isolation.

---

## Troubleshooting

### Components Not Rendering

**Check 1:** Is `defineCustomElements()` called?
```javascript
// In main.ts or plugin
import { defineCustomElements } from '@futalis/shared-components/loader'
defineCustomElements(window)
```

**Check 2:** Is Vue configured to ignore custom elements?
```javascript
// In vite.config.ts
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('futalis-')
    }
  }
})
```

**Check 3:** Browser console errors?
- Open DevTools Console
- Look for registration errors
- Check Network tab for 404s

### Props Not Updating

**Solution:** Use ref to set properties directly:
```vue
<script setup>
const headerRef = ref(null)
watch(myData, () => {
  if (headerRef.value) {
    headerRef.value.myProp = myData.value
  }
})
</script>

<template>
  <futalis-header ref="headerRef" />
</template>
```

### Styles Not Applying

**Check 1:** Are Font Awesome icons loaded?
```html
<!-- In index.html -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
```

**Check 2:** Are sprite images accessible?
- Components use: `https://media.futalis.com/futalis/futalis-sprite-2019-03.png`
- Check Network tab in DevTools

### Vite "Outside Allow List" Error

**Solution:** Add component library to Vite's allowed paths:
```javascript
// vite.config.ts
export default defineConfig({
  server: {
    fs: {
      allow: [
        '.',
        '../futalis-shared-header-footer-poc'
      ]
    }
  }
})
```

---

## Technical Details

### Why Stencil?

1. **Framework Agnostic**: Works with Vue, React, Angular, vanilla JS
2. **Web Standards**: Compiles to standard Web Components
3. **Small Bundle Size**: Only loads what's needed
4. **TypeScript**: Full type safety
5. **Lazy Loading**: Components load on-demand

### How Web Components Work

```javascript
// 1. Define a custom element
class MyElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<h1>Hello</h1>'
  }
}

// 2. Register it with browser
customElements.define('my-element', MyElement)

// 3. Use it in HTML
<my-element></my-element>
```

Stencil does all this for you, plus:
- Props/state management
- Event handling
- Lifecycle hooks
- Virtual DOM rendering
- TypeScript support

### Component Lifecycle

1. Component tag appears in HTML: `<futalis-header>`
2. Browser checks: "Is this registered?"
3. Stencil loader: "Yes, let me load it"
4. Component code loads (lazy)
5. Component renders
6. Props/events become active
7. Component can update when props change

---

## Publishing to NPM (Future)

When ready for production:

```bash
cd futalis-shared-header-footer-poc

# Update version
npm version patch  # or minor, or major

# Publish
npm publish --access public
```

Then in consuming apps:
```bash
npm install @futalis/shared-components@latest
```

---

## Resources

- [Stencil Documentation](https://stenciljs.com/docs/introduction)
- [Web Components Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements API](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements)
- [Vue 3 + Web Components](https://vuejs.org/guide/extras/web-components.html)
- [React + Web Components](https://react.dev/reference/react-dom/components#custom-html-elements)
