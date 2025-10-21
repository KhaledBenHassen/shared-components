# Futalis Shared Components - Implementation Guide

## Overview

This document outlines the complete implementation of shared header and footer components using Stencil.js, published to GitHub Packages, and integrated into three different frameworks: Vue 3 (CAPI), Nuxt 3 (shop), and Next.js (futalis-next-wp).

## Table of Contents

1. [Building the Stencil Component Library](#1-building-the-stencil-component-library)
2. [Publishing to GitHub Packages](#2-publishing-to-github-packages)
3. [Integration: CAPI (Vue 3)](#3-integration-capi-vue-3)
4. [Integration: Shop (Nuxt 3)](#4-integration-shop-nuxt-3)
5. [Integration: Next.js](#5-integration-nextjs)
6. [Troubleshooting](#6-troubleshooting)
7. [TODOs / Next Steps](#7-todos--next-steps)
8. [Technical Reference](#8-technical-reference)

---

## 1. Building the Stencil Component Library

### 1.1 Project Setup

**Location:** `/futalis-shared-header-footer-poc/`

**Key Technologies:**
- Stencil.js 4.27.1
- SCSS for styling
- Shadow DOM disabled for better framework compatibility

### 1.2 Components

**Header Component** (`futalis-header`)
**Footer Component** (`futalis-footer`)

Both are POCs for now, means design is not final and it's not functional.

### 1.3 Build Process

```bash
npm run build
```

**Output:**
- `dist/` - Compiled components
- `loader/` - Framework integration loader

---

## 2. Publishing to GitHub Packages

### 2.1 Prerequisites

1. **GitHub Repository:** https://github.com/futalis-it/shared-components
2. **GitHub Personal Access Token (Classic)** with scopes:
   - `repo`
   - `write:packages`
   - `read:packages`

### 2.2 Configure npm Registry

**File:** `.npmrc`

```
@futalis-it:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2.3 Authentication

```bash
# Set environment variable (temporary)
export GITHUB_TOKEN=your_token_here

# OR login via npm (recommended)
npm login --scope=@futalis-it --registry=https://npm.pkg.github.com
# Username: your-github-username
# Password: your-github-token
```

### 2.4 Version Management

```bash
# Bump version (creates git tag)
npm version patch  # 0.0.1 -> 0.0.2
```

### 2.5 Publish

```bash
npm publish
```

**Published Package:** `@futalis-it/shared-components@0.0.2`

**Registry URL:** https://npm.pkg.github.com/@futalis-it/shared-components

---

## 3. Integration: CAPI (Vue 3)

**Project:** `/customer-and-partner-interface/`

### Steps

1. **Configure `.npmrc`** for GitHub Packages with authentication token
2. **Install package:** `npm install @futalis-it/shared-components@latest`
3. **Register components** in `src/main.ts` using `defineCustomElements()`
4. **Configure Vue** to recognize `futalis-*` custom elements in `app.config.compilerOptions`
5. **Configure Vite** to recognize custom elements in `vite.config.mts`
6. **Create wrapper components:**
   - `src/components/template/common/TheHeader.vue`
   - `src/components/template/common/TheFooter.vue`
7. **Handle events:** Logo click, newsletter click

**Font Loading:** Fonts loaded via CDN in `index.html`

See [Technical Reference - CAPI Integration](#capi-vue-3-integration) for detailed code examples.

## 4. Integration: Shop (Nuxt 3)

**Project:** `/shop/`

### Steps

1. **Configure `.npmrc`** for GitHub Packages with authentication token
2. **Install package:** `npm install @futalis-it/shared-components@latest`
3. **Create client-side plugin** at `plugins/stencil-components.client.ts` to register components
4. **Configure Nuxt** to recognize `futalis-*` custom elements in `nuxt.config.ts`
5. **Create wrapper components:**
   - `components/templates/ShopHeader.vue`
   - `components/main/Footer.vue`
6. **Handle events:** Logo click, newsletter click

See [Technical Reference - Shop Integration](#shop-nuxt-3-integration) for detailed code examples.

---

## 5. Integration: Next.js

**Project:** `/futalis-next-wp/`

### Steps

1. **Configure `.npmrc`** for GitHub Packages with authentication token
2. **Install package:** `npm install @futalis-it/shared-components@latest`
3. **Add Google Fonts** import to `app/globals.css` (Days One, PT Sans, Roboto)
4. **Create TypeScript definitions** at `lib/stencil.d.ts` for custom elements
5. **Create client component wrappers** (with `'use client'` directive):
   - `components/shared/Header.tsx`
   - `components/shared/Footer.tsx`
6. **Update layout** at `app/layout.tsx` to use Header and Footer components
7. **Handle events** using `useEffect` and DOM event listeners

**Important:** Next.js requires client components for browser APIs and event listeners.

See [Technical Reference - Next.js Integration](#nextjs-integration) for detailed code examples.

## 6. Troubleshooting

### Common Issues

#### 1. npm 401 Unauthorized

**Symptom:** Cannot install package from GitHub Packages

**Solution:**
1. Ensure `.npmrc` is configured correctly
2. Verify GITHUB_TOKEN has required scopes
3. Use classic token, not fine-grained

```bash
npm login --scope=@futalis-it --registry=https://npm.pkg.github.com
```

#### 2. npm 409 Conflict

**Symptom:** Version already published

**Solution:** Bump version number

```bash
npm version patch
npm publish
```

#### 3. Custom Elements Not Recognized

**Symptom:** TypeScript errors or component not rendering

**Solution:**
- **Vue/Nuxt:** Configure `isCustomElement` in Vite/Nuxt config
- **Next.js:** Create TypeScript definitions file

#### 4. Styles Not Applying

**Symptom:** Components render but styling is broken

**Solution:**
- Ensure `shadow: false` in Stencil component
- All styles scoped under `.header` and `.footer` class names
- No CSS variable conflicts

## Summary of Changes

### Stencil Component Library
- Created `futalis-header` and `futalis-footer` components
- Used SCSS for styling
- Disabled shadow DOM (`shadow: false`)
- Hardcoded color values (#bccf00, #4a4a49, #707070)
- Published to GitHub Packages as `@futalis-it/shared-components@0.0.2`

### CAPI Integration
- Installed package from GitHub Packages
- Configured Vue to recognize custom elements
- Created wrapper components in `src/components/template/common/`
- Fonts loaded via CDN in `index.html`

### Shop Integration
- Installed package from GitHub Packages
- Created client-side Nuxt plugin
- Configured Nuxt config for custom elements
- Created wrapper components in `components/`

### Next.js Integration
- Installed package from GitHub Packages
- Added Google Fonts import to `globals.css`
- Created TypeScript definitions
- Created client component wrappers with `'use client'` directive
- Updated layout to use shared components

---

## Maintenance

### Updating Components

1. Make changes to Stencil components
2. Run `npm run build`
3. Bump version: `npm version patch`
4. Publish: `npm publish`
5. Update consuming apps: `npm update @futalis-it/shared-components`

### Adding New Props

1. Add `@Prop()` to Stencil component
2. Update TypeScript definitions for Next.js
3. Document in this file

### Testing Across Frameworks

Before publishing:
1. Test in CAPI (Vue 3)
2. Test in Shop (Nuxt 3)
3. Test in Next.js
4. Verify responsive behavior (desktop/mobile)
5. Verify all event handlers work

---

## 7. TODOs / Next Steps

**Current State:** POC with static, simplified components

**What Needs to Work:**

1. **Dynamic Data from API**
   - Menu items loaded from API
   - User session data
   - Real-time updates

2. **Reactivity**
   - Logged-in customer display (name, status)
   - Cart item count updates
   - Conditional rendering based on user role

3. **Custom Events & Interactions**
   - Logout confirmation popup (on hover like original CAPI)
   - Menu interactions (expandable, sub-menus)
   - Cart preview on hover
   - Can Stencil emit events to parent (Vue/React)? **Answer: YES**

4. **Feature Parity**
   - Everything works exactly as the original CAPI implementation
   - All user flows preserved
   - All popups, modals, and interactions functional

**Approach:** Stencil components handle presentation, parent components (Vue/React) handle data and business logic.

---

## 8. Technical Reference

This section contains detailed code examples for all integrations.

### Stencil Component Code

#### Header Component

**File:** `src/components/futalis-header/futalis-header.tsx`

```typescript
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'futalis-header',
  styleUrl: 'futalis-header.scss',
  shadow: false,
})
export class FutalisHeader {
  @Prop() itemCount: number = 0
  @Prop() isLoggedIn: boolean = false
  @Event() logoClick: EventEmitter<void>

  handleLogoClick = () => {
    this.logoClick.emit()
  }

  render() {
    return (
      <div class="futalis-header-wrapper">
        <div class="desktop header">
          <div class="wide-container">
            <div class="top-bar"></div>
            <div class="main-container">
              <div class="left-container">
                <div class="icons">
                  <div class="header-icon uni light"></div>
                  <div class="header-icon gmp small light"></div>
                  <div class="header-icon trusted small light"></div>
                  <div class="header-icon tuv small light"></div>
                </div>
              </div>
              <div class="middle-container">
                <a class="logo" onClick={this.handleLogoClick}>
                  futalis<span>®</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
```

#### Footer Component

**File:** `src/components/futalis-footer/futalis-footer.tsx`

```typescript
@Component({
  tag: 'futalis-footer',
  styleUrl: 'futalis-footer.scss',
  shadow: false,
})
export class FutalisFooter {
  @Prop() locale: string = 'en'
  @Prop() privacyUrl: string = '/datenschutz'
  @Prop() impressumUrl: string = '/impressum'
  @Prop() phoneNumber: string = '+49 341 392 987 9 0'
  @Prop() whatsappNumber: string = '4934139298790'
  @Prop() businessHours: string = 'Mo - Fr: 9 - 17'
  @Prop() copyrightText: string = '© futalis GmbH'
  @Prop() showNewsletter: boolean = false
  @Event() newsletterClick: EventEmitter<void>
}
```

---

### CAPI (Vue 3) Integration Code

#### Main Configuration

**File:** `src/main.ts`

```typescript
import { defineCustomElements } from "@futalis-it/shared-components/loader"

app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith("futalis-")
}

defineCustomElements(window)
```

#### Vite Configuration

**File:** `vite.config.mts`

```typescript
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('futalis-')
        }
      }
    })
  ]
})
```

#### Header Wrapper

**File:** `src/components/template/common/TheHeader.vue`

```vue
<template>
  <div>
    <futalis-header @logo-click="handleLogoClick" />
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'

const handleLogoClick = () => {
  navigateTo('/')
}
</script>
```

#### Footer Wrapper

**File:** `src/components/template/common/TheFooter.vue`

```vue
<template>
  <futalis-footer
    ref="footerRef"
    :locale="locale"
    privacy-url="/datenschutz"
    impressum-url="/impressum"
    phone-number="+49 341 392 987 9 0"
    whatsapp-number="4934139298790"
    business-hours="Mo - Fr: 9 - 17"
    copyright-text="© futalis GmbH"
    @newsletter-click="handleNewsletterClick"
  />
</template>

<script setup lang="ts">
const locale = 'de'

const handleNewsletterClick = () => {
  console.log('Newsletter clicked')
}
</script>
```

---

### Shop (Nuxt 3) Integration Code

#### Client-Side Plugin

**File:** `plugins/stencil-components.client.ts`

```typescript
import { defineCustomElements } from '@futalis-it/shared-components/loader'

export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    defineCustomElements(window)
  }
})
```

#### Nuxt Configuration

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

#### Header Wrapper

**File:** `components/templates/ShopHeader.vue`

```vue
<template>
  <div>
    <futalis-header @logo-click="handleLogoClick" />
  </div>
</template>

<script setup lang="ts">
const handleLogoClick = () => {
  navigateTo('/')
}
</script>
```

#### Footer Wrapper

**File:** `components/main/Footer.vue`

```vue
<template>
  <div>
    <futalis-footer
      locale="de"
      privacy-url="/datenschutz"
      impressum-url="/impressum"
      phone-number="+49 341 392 987 9 0"
      whatsapp-number="4934139298790"
      business-hours="Mo - Fr: 9 - 17"
      copyright-text="© futalis GmbH"
      @newsletter-click="handleNewsletterClick"
    />
  </div>
</template>

<script setup lang="ts">
const handleNewsletterClick = () => {
  console.log('Newsletter clicked')
}
</script>
```

---

### Next.js Integration Code

#### Font Imports

**File:** `app/globals.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Days+One&family=PT+Sans:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### TypeScript Definitions

**File:** `lib/stencil.d.ts`

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    'futalis-header': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'item-count'?: number
      'is-logged-in'?: boolean
    }
    'futalis-footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      locale?: string
      'privacy-url'?: string
      'impressum-url'?: string
      'phone-number'?: string
      'whatsapp-number'?: string
      'business-hours'?: string
      'copyright-text'?: string
      'show-newsletter'?: boolean
    }
  }
}
```

#### Header Component

**File:** `components/shared/Header.tsx`

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { defineCustomElements } from '@futalis-it/shared-components/loader'

export default function Header() {
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    defineCustomElements(window)

    const headerElement = headerRef.current?.querySelector('futalis-header')
    if (headerElement) {
      headerElement.addEventListener('logoClick', () => {
        router.push('/')
      })
    }

    return () => {
      if (headerElement) {
        headerElement.removeEventListener('logoClick', () => {})
      }
    }
  }, [router])

  return (
    <div ref={headerRef}>
      <futalis-header />
    </div>
  )
}
```

#### Footer Component

**File:** `components/shared/Footer.tsx`

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { defineCustomElements } from '@futalis-it/shared-components/loader'

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    defineCustomElements(window)

    const footerElement = footerRef.current?.querySelector('futalis-footer')
    if (footerElement) {
      footerElement.addEventListener('newsletterClick', () => {
        console.log('Newsletter clicked')
      })
    }

    return () => {
      if (footerElement) {
        footerElement.removeEventListener('newsletterClick', () => {})
      }
    }
  }, [])

  return (
    <div ref={footerRef}>
      <futalis-footer
        locale="de"
        privacy-url="/datenschutz"
        impressum-url="/impressum"
        phone-number="+49 341 392 987 9 0"
        whatsapp-number="4934139298790"
        business-hours="Mo - Fr: 9 - 17"
        copyright-text="© futalis GmbH"
      />
    </div>
  )
}
```

#### Layout Update

**File:** `app/layout.tsx`

```typescript
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```
