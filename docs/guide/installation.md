# Installation

## Package Manager

Install @toneflix/money using your preferred package manager:

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

## Requirements

- **Node.js**: 16.x or higher
- **TypeScript**: 4.5 or higher (optional, for TypeScript projects)

## Importing

After installation, you can import the library in your project:

### ES Modules

```typescript
import { Money, Exchange } from '@toneflix/money';
```

### CommonJS

```javascript
const { Money, Exchange } = require('@toneflix/money');
```

## TypeScript Configuration

The library includes TypeScript type definitions out of the box. No additional setup is required for TypeScript projects.

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## Environment Setup (Optional)

If you plan to use currency conversion features, you'll need an API key from [ExchangeRate-API](https://www.exchangerate-api.com/).

Create a `.env` file in your project root:

```bash
EXCHANGERATE_API_KEY=your-api-key-here
```

The library will automatically load this file if it exists. Alternatively, you can set the API key programmatically:

```typescript
import { Exchange } from '@toneflix/money';

Exchange.setApiKey('your-api-key-here');
```

## Next Steps

Now that you've installed the library, check out the [Quick Start](/guide/quick-start) guide to learn how to use it.
