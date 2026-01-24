---
layout: home

hero:
  name: '@toneflix/money'
  text: 'Money & Currency Made Simple'
  tagline: Format currency with ease, convert between currencies using live exchange rates, and perform calculations with proper precision.
  image:
    src: /banner.png
    alt: Money
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/toneflix/money

features:
  - icon: 💰
    title: Easy Currency Formatting
    details: Format numbers as currency with proper symbols and formatting for all major world currencies.

  - icon: 💱
    title: Live Exchange Rates
    details: Convert between currencies using real-time exchange rates from a reliable API.

  - icon: 🧮
    title: Mathematical Operations
    details: Perform calculations with proper precision - add, subtract, multiply, divide, and more.

  - icon: 🔗
    title: Chainable API
    details: Fluent, intuitive method chaining for complex operations and calculations.

  - icon: 📘
    title: TypeScript Support
    details: Full type safety with TypeScript definitions included out of the box.

  - icon: 📦
    title: Zero Dependencies
    details: No external runtime dependencies - lightweight and fast.
---

## Quick Example

```typescript
import { Money, Exchange } from '@toneflix/money';

// Format currency
Money.format(1234.56, 'USD'); // "$1,234.56"

// Perform calculations
const total = new Money(100, 'USD').add(50).multiply(2).subtract(25);

console.log(total.format()); // "$275.00"

// Convert currencies
Exchange.setApiKey('your-api-key');
const euros = await Exchange.from('USD').to('EUR').convert(100);

console.log(euros); // e.g., 92.5
```

## Installation

::: code-group

```bash [npm]
npm install @toneflix/money
```

```bash [pnpm]
pnpm add @toneflix/money
```

```bash [yarn]
yarn add @toneflix/money
```

:::
