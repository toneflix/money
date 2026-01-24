# Currency Conversion

Convert between currencies using live exchange rates.

## Setup

First, you need an API key from [ExchangeRate-API](https://www.exchangerate-api.com/):

1. Sign up for a free account
2. Get your API key
3. Set it using one of these methods:

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
const exchange = Exchange.from('USD');
// or with target
const exchange = Exchange.to('EUR');
```

## Chainable API

The Exchange class uses a thenable pattern for flexible chaining:

```typescript
// Build the chain (synchronous)
const chain = Exchange.from('USD').to('EUR').convert(100);

// Execute when ready (asynchronous)
const result = await chain;

// Or with callbacks
chain
  .then((result) => console.log(`Converted: ${result}`))
  .catch((error) => console.error('Conversion failed:', error))
  .finally(() => console.log('Done'));
```

## Using with Money Class

Convert Money instances to different currencies:

```typescript
import { Money } from '@toneflix/money';

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
    console.error('Please set your API key');
  } else {
    console.error('Conversion error:', error.message);
  }
}
```

## API Limits

The free tier provides:

- 1,500 requests per month
- Perfect for development and small projects
- No credit card required

For production use with higher limits, consider upgrading your plan.
