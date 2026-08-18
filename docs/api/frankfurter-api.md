# FrankfurterApi

`FrankfurterApi` is an exchange-rate provider that uses Frankfurter for live currency rates.

Unlike `ExchangeRateApi`, `FrankfurterApi` does not require an API key.

## Import

```typescript
import { Exchange, FrankfurterApi } from '@toneflix/money';
```

## Usage with Exchange

Select `FrankfurterApi` using `Exchange.setProvider()`:

```typescript
import { Exchange, FrankfurterApi } from '@toneflix/money';

Exchange.setProvider(FrankfurterApi);

const result = await Exchange.from('USD').to('EUR').convert(100);
```

No `Exchange.setApiKey()` call is required.

## Authentication

`FrankfurterApi` does not require an API key.

```typescript
Exchange.setProvider(FrankfurterApi);

const result = await Exchange.from('USD').to('EUR').convert(100);
```

## Constructor

`FrankfurterApi` follows the exchange-rate provider constructor pattern.

### Default Constructor

```typescript
new FrankfurterApi();
```

### Configuration Object

```typescript
new FrankfurterApi(
  config: ExchangeRateInput,
  apiKey?: string,
)
```

The optional API-key argument exists for compatibility with the provider constructor contract and is ignored by Frankfurter.

**Example:**

```typescript
const provider = new FrankfurterApi({
  source: 'USD',
  target: 'EUR',
  amount: 100,
});
```

### Positional Arguments

```typescript
new FrankfurterApi(
  source: CurrencyCode,
  target: CurrencyCode,
  amount: number,
  apiKey?: string,
)
```

**Example:**

```typescript
const provider = new FrankfurterApi('USD', 'EUR', 100);
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

### rate()

```typescript
rate(): Promise<number>
```

Get the exchange rate between the configured source and target currencies.

```typescript
const provider = new FrankfurterApi({
  source: 'USD',
  target: 'EUR',
  amount: 1,
});

const rate = await provider.rate();
```

### convert()

```typescript
convert(): Promise<number>
```

Convert the configured amount from the source currency to the target currency.

Frankfurter returns the exchange rate rather than a converted amount, so the provider derives the conversion result using:

```text
conversion result = rate × amount
```

**Example:**

```typescript
const provider = new FrankfurterApi({
  source: 'USD',
  target: 'EUR',
  amount: 100,
});

const result = await provider.convert();
```

## Rate Normalization

Conceptually, the provider normalizes Frankfurter's response into:

```typescript
{
  conversion_rate: data.rate,
  conversion_result: data.rate * amount,
}
```

This allows `Exchange` to use `FrankfurterApi` without provider-specific logic.

## Chainable Provider API

```typescript
const provider = new FrankfurterApi();

const result = await provider.source('USD').target('EUR').amount(100).convert();
```

## Using as an Exchange Provider

Pass the provider class directly to `Exchange.setProvider()`:

```typescript
Exchange.setProvider(FrankfurterApi);
```

The rest of the `Exchange` API remains unchanged:

```typescript
const converted = await Exchange.from('USD').to('EUR').convert(100);

const rate = await Exchange.from('USD').to('EUR').rate();

const formatted = await Exchange.from('USD').to('GBP').convert(100).format();
```

## Switching from ExchangeRateApi

```typescript
import { Exchange, ExchangeRateApi, FrankfurterApi } from '@toneflix/money';

Exchange.setProvider(ExchangeRateApi);
Exchange.setApiKey('your-api-key');

const first = await Exchange.from('USD').to('EUR').convert(100);

Exchange.setProvider(FrankfurterApi);

const second = await Exchange.from('USD').to('EUR').convert(100);
```

## Errors

Provider and network errors are exposed through `ExchangeException`.

Because Frankfurter does not require authentication, it does not require the `missing-key` flow used by `ExchangeRateApi`.

```typescript
try {
  const result = await Exchange.from('USD').to('EUR').convert(100);
} catch (error) {
  console.error('Conversion error:', error.message);
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
- [ExchangeRateApi](./exchange-rate-api)
