# ExchangeRateApi

`ExchangeRateApi` is the default exchange-rate provider used by `Exchange`.

It uses ExchangeRate-API for live currency conversion and preserves the existing API-key based workflow.

## Import

```typescript
import { Exchange, ExchangeRateApi } from '@toneflix/money';
```

## Usage with Exchange

`ExchangeRateApi` is the default provider, so you do not need to select it explicitly.

```typescript
import { Exchange } from '@toneflix/money';

Exchange.setApiKey('your-api-key-here');

const result = await Exchange.from('USD').to('EUR').convert(100);
```

You can also select it explicitly:

```typescript
import { Exchange, ExchangeRateApi } from '@toneflix/money';

Exchange.setProvider(ExchangeRateApi);
Exchange.setApiKey('your-api-key-here');

const result = await Exchange.from('USD').to('EUR').convert(100);
```

## Authentication

`ExchangeRateApi` requires an API key.

You can configure the API key programmatically:

```typescript
Exchange.setApiKey('your-api-key-here');
```

Or through the environment:

```bash
EXCHANGERATE_API_KEY=your-api-key-here
```

The provider also supports these environment fallbacks:

```bash
VITE_EXCHANGERATE_API_KEY=your-api-key-here
NEXT_EXCHANGERATE_API_KEY=your-api-key-here
```

An API key passed directly to the provider takes precedence over environment configuration.

## Constructor

`ExchangeRateApi` supports multiple constructor signatures.

### Default Constructor

```typescript
new ExchangeRateApi();
```

Creates a provider using the default configuration:

```typescript
{
  source: 'USD',
  target: 'EUR',
  amount: 1,
}
```

### Configuration Object

```typescript
new ExchangeRateApi(
  config: ExchangeRateInput,
  apiKey?: string,
)
```

**Example:**

```typescript
const provider = new ExchangeRateApi(
  {
    source: 'USD',
    target: 'EUR',
    amount: 100,
  },
  'your-api-key',
);
```

### Positional Arguments

```typescript
new ExchangeRateApi(
  source: CurrencyCode,
  target: CurrencyCode,
  amount: number,
  apiKey?: string,
)
```

**Example:**

```typescript
const provider = new ExchangeRateApi('USD', 'EUR', 100, 'your-api-key');
```

## Methods

### source()

```typescript
source(value: CurrencyCode): this
```

Set the source currency and return the provider instance for chaining.

### target()

```typescript
target(value: CurrencyCode): this
```

Set the target currency and return the provider instance for chaining.

### amount()

```typescript
amount(value: number): this
```

Set the amount to convert and return the provider instance for chaining.

### convert()

```typescript
convert(): Promise<number>
```

Convert the configured amount from the source currency to the target currency.

```typescript
const provider = new ExchangeRateApi(
  {
    source: 'USD',
    target: 'EUR',
    amount: 100,
  },
  'your-api-key',
);

const result = await provider.convert();
```

### rate()

```typescript
rate(): Promise<number>
```

Get the exchange rate between the configured source and target currencies.

```typescript
const provider = new ExchangeRateApi(
  {
    source: 'USD',
    target: 'EUR',
    amount: 1,
  },
  'your-api-key',
);

const rate = await provider.rate();
```

## Chainable Provider API

```typescript
const provider = new ExchangeRateApi();

const result = await provider.source('USD').target('EUR').amount(100).convert();
```

## Using as an Exchange Provider

`ExchangeRateApi` implements the exchange-rate provider contract and can be passed directly to `Exchange.setProvider()`.

```typescript
Exchange.setProvider(ExchangeRateApi);
```

## Errors

If no API key can be resolved, the provider throws an `ExchangeException` with the `missing-key` error type.

```typescript
try {
  const result = await Exchange.from('USD').to('EUR').convert(100);
} catch (error) {
  if (error.type === 'missing-key') {
    console.error('Please configure an ExchangeRate-API key');
  }
}
```

## Provider Contract

```typescript
interface ExchangeRateContract {
  source(value: CurrencyCode): this;
  target(value: CurrencyCode): this;
  amount(value: number): this;
  convert(): Promise<number>;
  rate(): Promise<number>;
}
```

## Related

- [Exchange Class](./exchange)
- [Currency Conversion](../guide/currency-conversion)
- [FrankfurterApi](./frankfurter-api)
