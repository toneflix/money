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
import {
  Money,
  Exchange,
  ExchangeRateApi,
  FrankfurterApi,
} from '@toneflix/money';
```

### CommonJS

```javascript
const {
  Money,
  Exchange,
  ExchangeRateApi,
  FrankfurterApi,
} = require('@toneflix/money');
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

## Exchange Rate Providers

Currency conversion is handled through exchange-rate providers.

`ExchangeRateApi` is the default provider and preserves the existing API-key based workflow.

```typescript
import { Exchange, ExchangeRateApi } from '@toneflix/money';

Exchange.setProvider(ExchangeRateApi);
```

You can also use `FrankfurterApi`, which does not require an API key:

```typescript
import { Exchange, FrankfurterApi } from '@toneflix/money';

Exchange.setProvider(FrankfurterApi);
```

Provider selection does not change how you use the `Exchange` API:

```typescript
const result = await Exchange.from('USD').to('EUR').convert(100);
```

## ExchangeRateApi Setup

If you're using the default `ExchangeRateApi` provider, you'll need an API key from [ExchangeRate-API](https://www.exchangerate-api.com/).

You can configure the API key using an environment variable:

```bash
EXCHANGERATE_API_KEY=your-api-key-here
```

The library will automatically load your environment configuration if available.

Alternatively, you can set the API key programmatically:

```typescript
import { Exchange } from '@toneflix/money';

Exchange.setApiKey('your-api-key-here');
```

You can also explicitly select the provider:

```typescript
import { Exchange, ExchangeRateApi } from '@toneflix/money';

Exchange.setProvider(ExchangeRateApi);
Exchange.setApiKey('your-api-key-here');
```

`Exchange.setApiKey()` remains supported for backwards compatibility.

## FrankfurterApi Setup

`FrankfurterApi` does not require an API key.

Simply select it as your exchange-rate provider:

```typescript
import { Exchange, FrankfurterApi } from '@toneflix/money';

Exchange.setProvider(FrankfurterApi);

const result = await Exchange.from('USD').to('EUR').convert(100);
```

No environment variable or `Exchange.setApiKey()` call is required when using Frankfurter.

## Next Steps

Now that you've installed the library:

- Check out the [Quick Start](./quick-start)
- Learn about [Currency Conversion](./currency-conversion)
- Explore the [API Reference](../api/money)
