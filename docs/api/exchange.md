# Exchange Class

The Exchange class handles currency conversion with live exchange rates.

## Constructor

```typescript
new Exchange(source?: CurrencyCode, target?: CurrencyCode, amount?: number)
```

Create a new Exchange instance.

**Parameters:**

- `source` - Source currency code (optional)
- `target` - Target currency code (optional)
- `amount` - Amount to convert (optional, default: 1)

**Example:**

```typescript
const exchange = new Exchange('USD', 'EUR', 100);
```

## Static Methods

### setApiKey()

```typescript
Exchange.setApiKey(key: string): void
```

Set the API key for exchange rate requests.

**Example:**

```typescript
Exchange.setApiKey('your-api-key-here');
```

**Getting an API Key:**

1. Sign up at [exchangerate-api.com](https://www.exchangerate-api.com/)
2. Get your free API key
3. Set it using `Exchange.setApiKey()` or via `EXCHANGERATE_API_KEY` environment variable

### from()

```typescript
Exchange.from(currency: CurrencyCode): Exchange
```

Create an Exchange instance with source currency (static method).

**Example:**

```typescript
const exchange = Exchange.from('USD');
```

### to()

```typescript
Exchange.to(currency: CurrencyCode): Exchange
```

Create an Exchange instance with target currency (static method).

**Example:**

```typescript
const exchange = Exchange.to('EUR');
```

### format()

```typescript
Exchange.format(amount: number, from: CurrencyCode, to: CurrencyCode): Promise<string>
```

Convert and format amount in one call (static method).

**Example:**

```typescript
const formatted = await Exchange.format(100, 'USD', 'EUR');
// e.g., "€92.50"
```

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
convert(amount: number, source?: CurrencyCode, target?: CurrencyCode): this
```

Set conversion parameters. Returns `this` for chaining.

**Example:**

```typescript
const result = await exchange.convert(100);
// or with optional parameters
const result = await exchange.convert(100, 'USD', 'EUR');
```

### rate()

```typescript
rate(source?: CurrencyCode, target?: CurrencyCode): this
```

Get exchange rate. Returns `this` for chaining.

**Example:**

```typescript
const rate = await exchange.rate('USD', 'EUR');
// or chained
const rate = await exchange.from('USD').to('EUR').rate();
```

### format()

```typescript
format(): Promise<string>
```

Format the converted amount with currency symbol.

**Example:**

```typescript
const formatted = await exchange.from('USD').to('EUR').convert(100).format();
// e.g., "€92.50"
```

## Thenable Interface

The Exchange class implements a "thenable" interface for seamless async/await integration.

### then()

```typescript
then<T>(
  onFulfilled?: (value: number) => T | PromiseLike<T>,
  onRejected?: (reason: any) => T | PromiseLike<T>
): Promise<T>
```

Execute the conversion chain.

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
catch<T>(onRejected?: (reason: any) => T | PromiseLike<T>): Promise<T>
```

Catch errors in the conversion chain.

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

Execute cleanup after conversion.

**Example:**

```typescript
exchange
  .from('USD')
  .to('EUR')
  .convert(100)
  .finally(() => console.log('Done'));
```

## How Thenable Works

The thenable pattern allows methods to return `this` synchronously for chaining, while async execution only happens when awaited or `.then()` is called:

```typescript
// Build chain (synchronous)
const chain = exchange.from('USD').to('EUR').convert(100);

// Execute (asynchronous)
const result = await chain;

// Or with callbacks
chain
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log('Complete'));
```

## Error Handling

```typescript
try {
  const result = await Exchange.from('USD').to('EUR').convert(100);
} catch (error) {
  if (error.type === 'missing-key') {
    console.error('Please set your API key');
  } else {
    console.error('Conversion error:', error.message);
  }
}
```

## Environment Variables

The library automatically loads the `.env` file if it exists. You can set:

```bash
# .env file
EXCHANGERATE_API_KEY=your-api-key-here
```

No need to call `Exchange.setApiKey()` if the environment variable is set.
