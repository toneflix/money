# @toneflix/money

A simple and efficient money and currency conversion and formatting tool for JavaScript and TypeScript projects. Format currency with ease, convert between currencies using live exchange rates, and chain operations elegantly.

[![npm version](https://img.shields.io/npm/v/@toneflix/money.svg?label=npm+version&style=flat-square)](https://www.npmjs.com/package/@toneflix/money)
[![npm downloads](https://img.shields.io/npm/dt/%40toneflix%2Fmoney?style=flat-square)](https://www.npmjs.com/package/@toneflix/money)
[![GitHub License](https://img.shields.io/github/license/toneflix/money?style=flat-square)](https://github.com/toneflix/money/blob/main/LICENSE)
[![Run Tests](https://github.com/toneflix/money/actions/workflows/run-tests.yml/badge.svg)](https://github.com/toneflix/money/actions/workflows/run-tests.yml)

## Features

- [x] **Easy Currency Formatting** - Format numbers as currency with proper symbols and formatting
- [x] **Live Exchange Rates** - Convert between currencies using real-time exchange rates
- [x] **Mathematical Operations** - Perform calculations with proper precision (add, subtract, multiply, divide, etc.)
- [x] **Chainable API** - Fluent, intuitive method chaining for complex operations
- [x] **TypeScript Support** - Full type safety with TypeScript definitions
- [x] **Multiple Currencies** - Support for all major world currencies
- [x] **Zero Runtime Dependencies** - No external dependencies, lightweight and fast

## Installation

```bash
npm install @toneflix/money
```

```bash
pnpm add @toneflix/money
```

```bash
yarn add @toneflix/money
```

## Quick Start

### Money Formatting

```typescript
import { Money } from '@toneflix/money';

// Format a number as currency
Money.format(1234.56, 'USD'); // "$1,234.56"
Money.format(1234.56, 'EUR'); // "€1,234.56"
Money.format(1234.56, 'GBP'); // "£1,234.56"

// Using instance methods
const money = new Money(1234.56, 'USD');
money.format(); // "$1,234.56"
money.whole(); // "$1,234" (no decimals)
money.compact(); // "$1.2K" (compact notation)
```

### Currency Conversion

```typescript
import { Exchange } from '@toneflix/money';

// Set your API key (get one from https://exchangerate-api.com)
Exchange.setApiKey('your-api-key-here');
// Or use environment variable: EXCHANGERATE_API_KEY

// Convert currency with chainable API
const result = await Exchange.from('USD').to('EUR').convert(100);

console.log(result); // e.g., 92.5 (euros)

// Get formatted result
const formatted = await Exchange.from('USD').to('GBP').convert(100).format();

console.log(formatted); // e.g., "£85.23"
```

## API Reference

### Money Class

The `Money` class handles currency formatting and display.

#### Constructor

```typescript
new Money(amount?: number | string, currency?: CurrencyCode)
```

**Parameters:**

- `amount` - The monetary amount to format
- `currency` - Optional currency code (e.g., 'USD', 'EUR', 'GBP')

**Example:**

```typescript
const money = new Money(1234.56, 'USD');
```

#### Static Methods

##### `Money.setDefaultCurrency(currency: CurrencyCode)`

Set the default currency for all Money instances.

```typescript
Money.setDefaultCurrency('EUR');
const money = new Money(100); // Uses EUR by default
```

##### `Money.format(amount: number | string, currency?: CurrencyCode)`

Format an amount as currency (static method).

```typescript
Money.format(1234.56, 'USD'); // "$1,234.56"
Money.format(1234.56, 'EUR'); // "€1,234.56"
Money.format(1234.56, 'JPY'); // "¥1,234.56"
```

##### `Money.whole(amount: number | string, currency?: CurrencyCode)`

Format an amount without decimal places (static method).

```typescript
Money.whole(1234.56, 'USD'); // "$1,234"
```

##### `Money.compact(amount: number | string, currency?: CurrencyCode)`

Format an amount in compact notation (static method).

```typescript
Money.compact(1234567, 'USD'); // "$1.2M"
Money.compact(1234, 'USD'); // "$1.2K"
Money.compact(1234567890, 'USD'); // "$1.2B"
```

##### `Money.convert(amount: number | string, from: CurrencyCode, to: CurrencyCode)`

Convert and format amount between currencies (static method).

```typescript
const converted = await Money.convert(100, 'USD', 'EUR');
console.log(converted.format()); // e.g., "€92.50"
```

##### `Money.currencyCode()`

Get the default currency code.

```typescript
Money.currencyCode(); // "USD"
```

##### `Money.currencySymbol()`

Get the default currency symbol.

```typescript
Money.currencySymbol(); // "$"
```

##### `Money.of(amount: number | string, currency?: CurrencyCode)`

Create a new Money instance (factory method).

```typescript
const money = Money.of(100, 'USD');
```

#### Instance Methods

##### `format()`

Format the amount with currency symbol and proper formatting.

```typescript
const money = new Money(1234.56, 'USD');
money.format(); // "$1,234.56"
```

##### `whole()`

Format the amount without decimal places.

```typescript
const money = new Money(1234.56, 'USD');
money.whole(); // "$1,234"
```

##### `compact()`

Format the amount in compact notation (K, M, B, T).

```typescript
const money = new Money(1234567, 'USD');
money.compact(); // "$1.2M"
```

##### `convert(to: CurrencyCode)`

Convert the amount to another currency.

```typescript
const money = new Money(100, 'USD');
const converted = await money.convert('EUR');
console.log(converted.format()); // e.g., "€92.50"
```

##### `setNegativeStyle(style: 'minus' | 'parentheses')`

Set how negative amounts should be displayed.

```typescript
const money = new Money(-100, 'USD');

money.setNegativeStyle('minus');
money.format(); // "-$100.00"

money.setNegativeStyle('parentheses');
money.format(); // "($100.00)"
```

##### `currencyCode()`

Get the current currency code.

```typescript
const money = new Money(100, 'EUR');
money.currencyCode(); // "EUR"
```

##### `currencySymbol()`

Get the current currency symbol.

```typescript
const money = new Money(100, 'GBP');
money.currencySymbol(); // "£"
```

##### `toString()`

Get string representation (same as format()).

```typescript
const money = new Money(100, 'USD');
money.toString() // "$100.00"
`${money}`; // "$100.00"
```

##### `add(other: number | string | Money)`

Add another amount to this Money instance.

```typescript
const money = new Money(100, 'USD');
const result = money.add(50);
console.log(result.format()); // "$150.00"

// Can also add another Money instance
const other = new Money(25, 'USD');
money.add(other).format(); // "$125.00"
```

##### `subtract(other: number | string | Money)`

Subtract another amount from this Money instance.

```typescript
const money = new Money(100, 'USD');
const result = money.subtract(30);
console.log(result.format()); // "$70.00"
```

##### `multiply(factor: number | string | Money)`

Multiply this Money instance by a factor.

```typescript
const money = new Money(50, 'USD');
const result = money.multiply(3);
console.log(result.format()); // "$150.00"
```

##### `divide(divisor: number | string | Money)`

Divide this Money instance by a divisor.

```typescript
const money = new Money(100, 'USD');
const result = money.divide(4);
console.log(result.format()); // "$25.00"
```

##### `ceil()`

Round this Money instance up to the nearest integer.

```typescript
const money = new Money(99.45, 'USD');
const result = money.ceil();
console.log(result.format()); // "$100.00"
```

##### `floor()`

Round this Money instance down to the nearest integer.

```typescript
const money = new Money(99.95, 'USD');
const result = money.floor();
console.log(result.format()); // "$99.00"
```

##### `round(digits?: number)`

Round this Money instance to specified decimal digits.

```typescript
const money = new Money(99.456, 'USD');

money.round().format(); // "$99.00" (default: 0 decimals)
money.round(1).format(); // "$99.50"
money.round(2).format(); // "$99.46"
```

##### `mod(divisor: number | string | Money)`

Calculate modulus (remainder) of this Money instance by divisor.

```typescript
const money = new Money(100, 'USD');
const result = money.mod(30);
console.log(result.format()); // "$10.00" (100 % 30 = 10)
```

##### `absolute()`

Get absolute value of this Money instance.

```typescript
const money = new Money(-100, 'USD');
const result = money.absolute();
console.log(result.format()); // "$100.00"
```

##### `share(total: number | string | Money, ratio: string | number)`

Calculate share of this Money instance based on total and ratio.

```typescript
const money = new Money(100, 'USD');
const result = money.share(1000, 0.1); // 10% share
console.log(result.format()); // "$10.00"

// Calculate proportional share
const part = new Money(25, 'USD');
const total = 100;
const ratio = 0.5; // 50% ratio
part.share(total, ratio).format(); // "$12.50"
```

### Exchange Class

The `Exchange` class handles currency conversion with live exchange rates.

#### Constructor

```typescript
new Exchange(source?: CurrencyCode, target?: CurrencyCode, amount?: number)
```

**Parameters:**

- `source` - Source currency code (optional)
- `target` - Target currency code (optional)
- `amount` - Amount to convert (optional, default: 1)

**Example:**

```typescript
const exchange = new Exchange('USD', 'EUR', 100);
```

#### Static Methods

##### `Exchange.setApiKey(key: string)`

Set the API key for exchange rate requests.

```typescript
Exchange.setApiKey('your-api-key-here');
```

**Getting an API Key:**

1. Sign up at [exchangerate-api.com](https://www.exchangerate-api.com/)
2. Get your free API key
3. Set it using `Exchange.setApiKey()` or via `EXCHANGERATE_API_KEY` environment variable

##### `Exchange.from(currency: CurrencyCode)`

Create a new Exchange instance with source currency (static method).

```typescript
const exchange = Exchange.from('USD');
```

##### `Exchange.to(currency: CurrencyCode)`

Create a new Exchange instance with target currency (static method).

```typescript
const exchange = Exchange.to('EUR');
```

##### `Exchange.format(amount: number, from: CurrencyCode, to: CurrencyCode)`

Convert and format amount in one call (static method).

```typescript
const formatted = await Exchange.format(100, 'USD', 'EUR');
console.log(formatted); // e.g., "€92.50"
```

#### Instance Methods

##### `from(currency: CurrencyCode)`

Set the source currency.

```typescript
const exchange = new Exchange();
exchange.from('USD');
```

##### `to(currency: CurrencyCode)`

Set the target currency.

```typescript
const exchange = new Exchange();
exchange.to('EUR');
```

##### `convert(amount: number, source?: CurrencyCode, target?: CurrencyCode)`

Convert an amount between currencies. Returns `this` for chaining.

```typescript
// Basic usage
const result = await exchange.convert(100);

// With optional currencies
const result = await exchange.convert(100, 'USD', 'EUR');

// Chainable
const result = await exchange.from('USD').to('EUR').convert(100);
```

##### `rate(source?: CurrencyCode, target?: CurrencyCode)`

Get the exchange rate between two currencies. Returns `this` for chaining.

```typescript
// Get exchange rate
const rate = await exchange.rate('USD', 'EUR');
console.log(rate); // e.g., 0.925

// Chainable
const rate = await exchange.from('USD').to('EUR').rate();
```

##### `format()`

Format the converted amount with currency symbol.

```typescript
const formatted = await exchange.from('USD').to('EUR').convert(100).format();

console.log(formatted); // e.g., "€92.50"
```

#### Thenable API

The `Exchange` class implements a "thenable" interface, making it work seamlessly with async/await and Promises:

```typescript
// Methods return 'this' for chaining (synchronous)
const chain = exchange.from('USD').to('EUR').convert(100);

// Execution happens when awaited or .then() is called
const result = await chain;

// Or with .then()
chain.then((result) => {
  console.log(result); // Converted amount
});

// With error handling
chain
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log('Done'));
```

**How it works:**

- All methods (`from()`, `to()`, `convert()`, `rate()`) return `this` synchronously
- The chain stays synchronous until you await it or call `.then()`
- When awaited/then'd, it automatically executes the API call
- This gives you full control over when the async operation happens

## Usage Examples

### Basic Formatting

```typescript
import { Money } from '@toneflix/money';

// Different currencies
console.log(Money.format(1234.56, 'USD')); // "$1,234.56"
console.log(Money.format(1234.56, 'EUR')); // "€1,234.56"
console.log(Money.format(1234.56, 'GBP')); // "£1,234.56"
console.log(Money.format(1234.56, 'JPY')); // "¥1,234.56"

// Different formats
console.log(Money.format(1234.56, 'USD')); // "$1,234.56"
console.log(Money.whole(1234.56, 'USD')); // "$1,234"
console.log(Money.compact(1234567, 'USD')); // "$1.2M"
```

### Negative Numbers

```typescript
import { Money } from '@toneflix/money';

const money = new Money(-1234.56, 'USD');

// Minus sign (default)
money.setNegativeStyle('minus');
console.log(money.format()); // "-$1,234.56"

// Parentheses (accounting style)
money.setNegativeStyle('parentheses');
console.log(money.format()); // "($1,234.56)"
```

### Compact Notation

```typescript
import { Money } from '@toneflix/money';

console.log(Money.compact(999, 'USD')); // "$999"
console.log(Money.compact(1234, 'USD')); // "$1.2K"
console.log(Money.compact(1234567, 'USD')); // "$1.2M"
console.log(Money.compact(1234567890, 'USD')); // "$1.2B"
console.log(Money.compact(1234567890123, 'USD')); // "$1.2T"
```

### Mathematical Operations

```typescript
import { Money } from '@toneflix/money';

const price = new Money(99.99, 'USD');

// Addition
const withTax = price.add(7.5);
console.log(withTax.format()); // "$107.49"

// Subtraction
const withDiscount = price.subtract(10);
console.log(withDiscount.format()); // "$89.99"

// Multiplication
const quantity = price.multiply(3);
console.log(quantity.format()); // "$299.97"

// Division
const perItem = price.divide(2);
console.log(perItem.format()); // "$49.995" or rounded

// Rounding
const rounded = price.round(2);
console.log(rounded.format()); // "$100.00"

// Chaining operations
const total = new Money(100, 'USD').add(50).multiply(2).subtract(25).round();

console.log(total.format()); // "$275.00"

// Calculate percentage/share
const amount = new Money(100, 'USD');
const tip = amount.share(100, 0.15); // 15% tip
console.log(tip.format()); // "$15.00"

// Absolute value
const debt = new Money(-50, 'USD');
console.log(debt.absolute().format()); // "$50.00"

// Modulus
const change = new Money(100, 'USD').mod(30);
console.log(change.format()); // "$10.00"
```

### Currency Conversion

```typescript
import { Exchange } from '@toneflix/money';

// Set API key
Exchange.setApiKey('your-api-key-here');

// Simple conversion
const amount = await Exchange.from('USD').to('EUR').convert(100);
console.log(amount); // e.g., 92.5

// Get exchange rate
const rate = await Exchange.from('USD').to('EUR').rate();
console.log(rate); // e.g., 0.925

// Convert and format
const formatted = await Exchange.from('USD').to('GBP').convert(100).format();
console.log(formatted); // e.g., "£85.23"
```

### Combining Money and Exchange

```typescript
import { Money } from '@toneflix/money';

Money.setDefaultCurrency('USD');

const money = new Money(100);
console.log(money.format()); // "$100.00"

// Convert to another currency
const converted = await money.convert('EUR');
console.log(converted.format()); // e.g., "€92.50"

// Static conversion
const result = await Money.convert(100, 'USD', 'GBP');
console.log(result.format()); // e.g., "£85.23"
```

### Advanced Chaining

```typescript
import { Exchange } from '@toneflix/money';

Exchange.setApiKey('your-api-key-here');

// Build the chain (synchronous)
const chain = Exchange.from('USD').to('EUR').convert(1000);

// Execute when ready (asynchronous)
const result = await chain;
console.log(result); // e.g., 925.0

// Or with callbacks
chain
  .then((result) => {
    console.log(`Converted: ${result}`);
    return result;
  })
  .then((result) => {
    // Chain more operations
    return result * 1.1;
  })
  .catch((error) => {
    console.error('Conversion failed:', error);
  })
  .finally(() => {
    console.log('Conversion complete');
  });
```

### Using Environment Variables

**This library has zero runtime dependencies** - you don't need `dotenv` or any other package!

Set the environment variable in your preferred way:

**Option 1: Using your own dotenv (if you have one)**

```bash
# .env file
EXCHANGERATE_API_KEY=your-api-key-here
```

**Option 2: System environment variables**

```bash
# Terminal
export EXCHANGERATE_API_KEY=your-api-key-here

# Or in your deployment platform (Vercel, Netlify, etc.)
```

**Option 3: Runtime configuration**

```typescript
// Set in code (works everywhere)
import { Exchange } from '@toneflix/money';

Exchange.setApiKey('your-api-key-here');
```

**Then use it:**

```typescript
import { Exchange } from '@toneflix/money';

// If EXCHANGERATE_API_KEY is set in environment or via setApiKey()
const result = await Exchange.from('USD').to('EUR').convert(100);
```

### Error Handling

```typescript
import { Exchange } from '@toneflix/money';

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

## Supported Currencies

The library supports all major world currencies including but not limited to:

- 🇺🇸 USD (US Dollar)
- 🇪🇺 EUR (Euro)
- 🇬🇧 GBP (British Pound)
- 🇯🇵 JPY (Japanese Yen)
- 🇨🇦 CAD (Canadian Dollar)
- 🇦🇺 AUD (Australian Dollar)
- 🇨🇭 CHF (Swiss Franc)
- 🇨🇳 CNY (Chinese Yuan)
- 🇮🇳 INR (Indian Rupee)
- And many more...

See the full list in the [currencies.ts](src/currencies.ts) file.

## API Key

To use currency conversion features, you need an API key from [ExchangeRate-API](https://www.exchangerate-api.com/).

**Getting Started:**

1. Visit [exchangerate-api.com](https://www.exchangerate-api.com/)
2. Sign up for a free account
3. Copy your API key
4. Set it using one of these methods:

```typescript
// Method 1: Set in code
Exchange.setApiKey('your-api-key-here');

// Method 2: Use environment variable
// Create a .env file with:
// EXCHANGERATE_API_KEY=your-api-key-here
```

**Free Tier:**

- 1,500 requests per month
- Perfect for development and small projects
- No credit card required

## TypeScript Support

This library is written in TypeScript and provides full type definitions out of the box.

```typescript
import { Money, Exchange, CurrencyCode } from '@toneflix/money';

// CurrencyCode type ensures type safety
const currency: CurrencyCode = 'USD';

// Full IDE autocomplete and type checking
const money = new Money(100, currency);
const formatted: string = money.format();

// Async operations are properly typed
const result: number = await Exchange.from('USD').to('EUR').convert(100);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

- Issues: [GitHub Issues](https://github.com/toneflix/money/issues)
- Documentation: [GitHub Repository](https://github.com/toneflix/money)
- Discussions: [GitHub Discussions](https://github.com/toneflix/money/discussions)

## Credits

Created by [Toneflix Technologies Limited](https://toneflix.net)

Exchange rates powered by [ExchangeRate-API](https://www.exchangerate-api.com/)
