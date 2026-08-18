# Exchange Class

The `Exchange` class handles currency conversion with live exchange rates through a configurable exchange-rate provider.

`ExchangeRateApi` is the default provider for backwards compatibility. You can switch providers using `Exchange.setProvider()`.

## Constructor

```typescript
new Exchange(source?: CurrencyCode, target?: CurrencyCode, amount?: number)
```

Create a new `Exchange` instance.

**Parameters:**

- `source` - Source currency code (optional)
- `target` - Target currency code (optional)
- `amount` - Amount to convert (optional, default: `1`)

**Example:**

```typescript
const exchange = new Exchange('USD', 'EUR', 100);
```

## Static Methods

### setApiKey()

```typescript
Exchange.setApiKey(key: string): void
```

Set the API key used by providers that require authentication.

This method is preserved for backwards compatibility with `ExchangeRateApi`.

**Example:**

```typescript
Exchange.setApiKey('your-api-key-here');
```

When using `ExchangeRateApi`, you can provide the API key using `Exchange.setApiKey()` or the `EXCHANGERATE_API_KEY` environment variable.

Providers such as `FrankfurterApi` do not require an API key.

### setProvider()

```typescript
Exchange.setProvider(provider: ExchangeRateProvider): void
```

Set the exchange-rate provider used by `Exchange`.

Pass the provider class itself, not an instance.

**Example:**

```typescript
import { Exchange, ExchangeRateApi, FrankfurterApi } from '@toneflix/money';

// ExchangeRateApi is the default provider
Exchange.setProvider(ExchangeRateApi);
Exchange.setApiKey('your-api-key-here');

// Switch to Frankfurter
Exchange.setProvider(FrankfurterApi);
```

The configured provider is used for subsequent conversions and exchange-rate requests.

### from()

```typescript
Exchange.from(currency: CurrencyCode): Exchange
```

Create an `Exchange` instance with the source currency.

**Example:**

```typescript
const exchange = Exchange.from('USD');
```

### to()

```typescript
Exchange.to(currency: CurrencyCode): Exchange
```

Create an `Exchange` instance with the target currency.

**Example:**

```typescript
const exchange = Exchange.to('EUR');
```

### format()

```typescript
Exchange.format(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
): Promise<string>
```

Convert and format an amount in one call using the currently configured provider.

**Example:**

```typescript
const formatted = await Exchange.format(100, 'USD', 'EUR');

// e.g., "€92.50"
```

## Exchange Rate Providers

### ExchangeRateApi

`ExchangeRateApi` is the default provider and requires an API key.

Existing code continues to work without explicitly selecting the provider:

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
```

### FrankfurterApi

`FrankfurterApi` does not require an API key.

```typescript
import { Exchange, FrankfurterApi } from '@toneflix/money';

Exchange.setProvider(FrankfurterApi);

const result = await Exchange.from('USD').to('EUR').convert(100);
```

The public `Exchange` API remains the same regardless of the selected provider.

## Instance Methods

### from()

```typescript
from(currency: CurrencyCode): this
```

Set the source currency.

**Example:**

```typescript
exchange.from('USD');
```

### to()

```typescript
to(currency: CurrencyCode): this
```

Set the target currency.

**Example:**

```typescript
exchange.to('EUR');
```

### convert()

```typescript
convert(
  amount: number,
  source?: CurrencyCode,
  target?: CurrencyCode,
): this
```

Set the conversion parameters.

The method returns `this` for chaining. The selected provider performs the conversion when the chain is awaited or executed through the thenable interface.

**Example:**

```typescript
const result = await exchange.convert(100);

// Or provide the currencies directly
const result = await exchange.convert(100, 'USD', 'EUR');

// Or use the chainable API
const result = await exchange.from('USD').to('EUR').convert(100);
```

### rate()

```typescript
rate(source?: CurrencyCode, target?: CurrencyCode): this
```

Get the exchange rate between two currencies.

The method returns `this` for chaining.

**Example:**

```typescript
const rate = await exchange.rate('USD', 'EUR');

// Or chained
const rate = await exchange.from('USD').to('EUR').rate();
```

### format()

```typescript
format(): Promise<string>
```

Convert and format the resulting amount using the target currency.

**Example:**

```typescript
const formatted = await exchange.from('USD').to('EUR').convert(100).format();

// e.g., "€92.50"
```

## Thenable Interface

The `Exchange` class implements a thenable interface for seamless `async`/`await` integration.

Methods such as `from()`, `to()`, `convert()`, and `rate()` return the `Exchange` instance synchronously. The provider request is executed when the chain is awaited or when a Promise method is called.

### then()

```typescript
then<T>(
  onFulfilled?: (value: number) => T | PromiseLike<T>,
  onRejected?: (reason: any) => T | PromiseLike<T>,
): Promise<T>
```

Execute the exchange chain.

**Example:**

```typescript
exchange
  .from('USD')
  .to('EUR')
  .convert(100)
  .then((result) => console.log(result));
```

### catch()

```typescript
catch<T>(
  onRejected?: (reason: any) => T | PromiseLike<T>,
): Promise<T>
```

Catch errors from the exchange chain.

**Example:**

```typescript
exchange
  .from('USD')
  .to('EUR')
  .convert(100)
  .catch((error) => console.error(error));
```

### finally()

```typescript
finally(onFinally?: (() => void) | null): Promise<number>
```

Execute a callback after the exchange operation completes.

**Example:**

```typescript
exchange
  .from('USD')
  .to('EUR')
  .convert(100)
  .finally(() => console.log('Done'));
```

## How Thenable Works

The thenable pattern allows the API to remain synchronously chainable while deferring the asynchronous provider request until the result is needed.

```typescript
// Build the chain synchronously
const chain = exchange.from('USD').to('EUR').convert(100);

// Execute asynchronously
const result = await chain;

// Or use Promise methods
chain
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log('Complete'));
```

## Error Handling

Provider-specific errors are exposed through the same `Exchange` chain.

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

The `missing-key` error applies to providers that require authentication, such as `ExchangeRateApi`.

`FrankfurterApi` does not require an API key.

## Environment Variables

Environment configuration is provider-specific.

`ExchangeRateApi` supports API-key configuration through:

```bash
# .env file
EXCHANGERATE_API_KEY=your-api-key-here
```

You can use the environment variable instead of calling:

```typescript
Exchange.setApiKey('your-api-key-here');
```

`Exchange.setApiKey()` takes care of the backwards-compatible runtime configuration, while the selected provider handles its own environment configuration.

When using `FrankfurterApi`, no API key or environment variable is required.
