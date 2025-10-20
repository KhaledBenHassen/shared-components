# Futalis Shared Header & Footer Components

## Overview

This is a Stencil.js component library containing shared header and footer components that can be used across multiple Futalis projects (Vue 3, Nuxt, Next.js).

## Project Structure

```
futalis-shared-header-footer-poc/
├── src/
│   ├── components/
│   │   ├── futalis-header/
│   │   │   ├── futalis-header.tsx
│   │   │   └── futalis-header.css
│   │   └── futalis-footer/
│   │       ├── futalis-footer.tsx
│   │       └── futalis-footer.css
│   ├── index.ts
│   └── components.d.ts
├── dist/                  # Built components
├── stencil.config.ts      # Stencil configuration
├── package.json
├── INTEGRATION.md         # Integration guide for consumers
└── CLAUDE/
    └── README.md         # This file
```

## Components Created

### 1. futalis-header

A responsive header component with:
- Logo
- Mobile hamburger menu
- Cart icon with item count badge
- User/login icon
- FAQ link (mobile)
- Certification badges (desktop)
- Vet/partner login button
- Customer login button
- Responsive design (mobile ≤1024px, desktop >1024px)

**Key Props:**
- `item-count`: Number - Cart item count
- `is-logged-in`: Boolean - User login state
- `user-name`: String - User's first name
- `menu-items`: Array - Menu items
- `locale`: String - Language (en/de)

**Events:**
- `logo-click`: Logo clicked
- `cart-click`: Cart icon clicked
- `menu-item-click`: Menu item clicked

### 2. futalis-footer

A responsive footer component with:
- Contact section (phone + WhatsApp)
- Payment methods display
- Links (Privacy, Impressum, Cookie settings, Newsletter)
- Certification badges (GMP, Trusted, TÜV)
- Copyright notice

**Key Props:**
- `locale`: String - Language (en/de)
- `show-newsletter`: Boolean - Show newsletter link
- `phone-number`: String - Contact phone
- `whatsapp-number`: String - WhatsApp number
- `show-payment-methods`: Boolean - Display payment icons

**Events:**
- `newsletter-click`: Newsletter link clicked

## Design Principles

1. **Framework Agnostic**: Built with Stencil.js to work across Vue, React, Angular, and vanilla JS
2. **Web Standards**: Uses web components standards for maximum compatibility
3. **Responsive**: Mobile-first design with breakpoints at 1024px
4. **Event-Driven**: Emits custom events for parent integration
5. **Configurable**: Props for customization without code changes
6. **i18n Ready**: Built-in support for English and German translations

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run start

# Build components for production
npm run build

# Run tests
npm test

# Generate new component
npm run generate
```

## Integration Status

### ✅ CAPI (customer-and-partner-interface) - Vue 3
- Package linked via local path
- `main.ts` configured with custom element registration
- `vite.config.mts` updated with custom element handling
- Ready to use in components

### ⏳ Shop - Nuxt
- Not yet integrated
- See INTEGRATION.md for Nuxt setup steps

### ⏳ Future Next.js Project
- Not yet integrated
- See INTEGRATION.md for Next.js setup steps

## How It Works

1. **Build Process**: Stencil compiles the TypeScript/JSX components to standard web components
2. **Output Targets**:
   - `dist`: Standard distribution with ES modules and CommonJS
   - `dist-custom-elements`: Custom elements bundle for frameworks
   - `loader`: Lazy-loading wrapper for framework integration
   - `www`: Development preview

3. **Framework Integration**:
   - The loader dynamically registers components with the browser
   - Frameworks are configured to ignore `futalis-*` custom elements
   - Props are passed as HTML attributes or properties
   - Events bubble up as custom DOM events

## Styling Architecture

- CSS custom properties (CSS variables) for theming
- Scoped styles per component (no shadow DOM to avoid style encapsulation issues)
- Responsive breakpoints:
  - Mobile: ≤1024px
  - Desktop: >1024px
- Uses existing Futalis design system:
  - Colors: `--light-green`, `--medium-green`, `--light-black`
  - Fonts: Futura, Roboto, PT Sans
  - Sprite sheet for icons: `futalis-sprite-2019-03.png`

## Next Steps

1. **Replace Existing Components**: Update CAPI to use these shared components instead of TheHeader.vue/TheFooter.vue
2. **Integrate with Shop**: Add components to the Nuxt shop project
3. **Publish to NPM**: Once stable, publish as `@futalis/shared-components`
4. **Add More Components**: Extend library with other shared UI elements
5. **Storybook**: Add Storybook for component documentation and testing

## Notes

- Components use Font Awesome icons - ensure Font Awesome is loaded in consuming apps
- Sprite images are hosted on `media.futalis.com`
- Cookie consent integration requires `UC_UI.showSecondLayer()` to be available globally
- Menu items can contain HTML content for submenus

## Troubleshooting

**Issue**: Components not rendering
- Check that `defineCustomElements()` is called
- Verify custom element configuration in Vue/Vite config
- Check browser console for registration errors

**Issue**: Props not updating
- Some props may need explicit binding with `:` in Vue
- Complex objects should be passed as properties, not attributes

**Issue**: Styles not applying
- Verify Font Awesome is loaded
- Check that sprite images are accessible
- Ensure no CSS conflicts with custom element tags

## Resources

- [Stencil Documentation](https://stenciljs.com/docs/introduction)
- [Web Components Standards](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Vue 3 + Web Components](https://vuejs.org/guide/extras/web-components.html)
- [INTEGRATION.md](../INTEGRATION.md) - Consumer integration guide
