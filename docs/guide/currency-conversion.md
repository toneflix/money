# Currency Conversion

Convert between currencies using live exchange rates from a configurable exchange-rate provider.

## Exchange Rate Providers

`@toneflix/money` supports multiple exchange-rate providers.

- `ExchangeRateApi` is the default provider and requires an API key.
- `FrankfurterApi` does not require an API key.
- Use `Exchange.setProvider()` to switch providers.

Provider selection does not change how you use the `Exchange` API.

## ExchangeRateApi Setup

`ExchangeRateApi` is the default provider, so existing code continues to work without explicitly selecting it.

First, get an API key from [ExchangeRate-API](https://www.exchangerate-api.com/):

1. Sign up for an account
2. Get your API key
3. Configure it using an environment variable or `Exchange.setApiKey()`

### Method 1: Environment Variable

Create a `.env` file:

```bash
EXCHANGERATE_API_KEY=your-api-key-here
```

The library will automatically load this file if it exists.

### Method 2: Set in Code

```typescript
import { Exchange } from '@toneflix/money';

Exchange.setApiKey('your-api-key-here');
```

You can also explicitly select `ExchangeRateApi`:

```typescript
import { Exchange, ExchangeRateApi } from '@toneflix/money';

Exchange.setProvider(ExchangeRateApi);
Exchange.setApiKey('your-api-key-here');
```

`Exchange.setApiKey()` remains supported for backwards compatibility.

## FrankfurterApi Setup

`FrankfurterApi` does not require an API key.

Select it using `Exchange.setProvider()`:

```typescript
import { Exchange, FrankfurterApi } from '@toneflix/money';

Exchange.setProvider(FrankfurterApi);
```

Once selected, use the same `Exchange` API:

```typescript
const result = await Exchange.from('USD').to('EUR').convert(100);

console.log(result);
```

No environment variable or `Exchange.setApiKey()` call is required when using Frankfurter.

## Selecting a Provider

Use `Exchange.setProvider()` to select the provider used for subsequent exchange-rate requests.

```typescript
import { Exchange, ExchangeRateApi, FrankfurterApi } from '@toneflix/money';

// Use ExchangeRate-API
Exchange.setProvider(ExchangeRateApi);
Exchange.setApiKey('your-api-key-here');

// Or switch to Frankfurter
Exchange.setProvider(FrankfurterApi);
```

The selected provider is used by `convert()`, `rate()`, `format()`, and currency conversion through the `Money` class.

## Basic Conversion

Convert an amount from one currency to another:

```typescript
import { Exchange } from '@toneflix/money';

const result = await Exchange.from('USD').to('EUR').convert(100);

console.log(result); // e.g., 92.5
```

## Get Exchange Rate

Get the exchange rate between two currencies:

```typescript
const rate = await Exchange.from('USD').to('EUR').rate();

console.log(rate); // e.g., 0.925
```

## Format Converted Amount

Get the converted amount with currency formatting:

```typescript
const formatted = await Exchange.from('USD').to('GBP').convert(100).format();

console.log(formatted); // e.g., "£85.23"
```

## Static Methods

Use static methods for one-off conversions:

```typescript
// Quick format
const formatted = await Exchange.format(100, 'USD', 'EUR');

console.log(formatted); // e.g., "€92.50"

// Create instance with source
const fromUsd = Exchange.from('USD');

// Or with target
const toEur = Exchange.to('EUR');
```

## Chainable API

The `Exchange` class uses a thenable pattern for flexible chaining.

Methods such as `from()`, `to()`, `convert()`, and `rate()` return the `Exchange` instance synchronously. The exchange-rate request is executed when the chain is awaited or when a Promise method is called.

```typescript
// Build the chain synchronously
const chain = Exchange.from('USD').to('EUR').convert(100);

// Execute when ready
const result = await chain;

// Or use Promise methods
chain
  .then((result) => console.log(`Converted: ${result}`))
  .catch((error) => console.error('Conversion failed:', error))
  .finally(() => console.log('Done'));
```

## Using with Money Class

Currency conversion through the `Money` class uses the provider configured on `Exchange`.

```typescript
import { Exchange, FrankfurterApi, Money } from '@toneflix/money';

// Optional: select a different provider
Exchange.setProvider(FrankfurterApi);

const usd = new Money(100, 'USD');
const eur = await usd.convert('EUR');

console.log(eur.format()); // e.g., "€92.50"

// Static conversion
const converted = await Money.convert(100, 'USD', 'GBP');

console.log(converted.format()); // e.g., "£85.23"
```

## Error Handling

Handle conversion errors gracefully:

```typescript
try {
  const result = await Exchange.from('USD').to('EUR').convert(100);

  console.log(result);
} catch (error) {
  if (error.type === 'missing-key') {
    console.error('Please configure an API key for the selected provider');
  } else {
    console.error('Conversion error:', error.message);
  }
}
```

A `missing-key` error applies to providers that require authentication, such as `ExchangeRateApi`. Providers such as `FrankfurterApi` do not require an API key.

## Provider Limits

Usage limits depend on the exchange-rate provider you select.

### ExchangeRateApi

The ExchangeRate-API free tier provides:

- 1,500 requests per month
- Suitable for development and small projects
- No credit card required

For production use with higher limits, consider upgrading your ExchangeRate-API plan.

### FrankfurterApi

Frankfurter does not require an API key. Refer to the Frankfurter service documentation for provider-specific availability and usage information.
