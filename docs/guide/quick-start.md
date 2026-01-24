# Quick Start

Get up and running with @toneflix/money in minutes.

## Money Formatting

Format numbers as currency with proper symbols and formatting:

```typescript
import { Money } from '@toneflix/money';

// Static formatting
Money.format(1234.56, 'USD'); // "$1,234.56"
Money.format(1234.56, 'EUR'); // "€1,234.56"
Money.format(1234.56, 'GBP'); // "£1,234.56"

// Instance formatting
const money = new Money(1234.56, 'USD');
money.format(); // "$1,234.56"
money.whole(); // "$1,234" (no decimals)
money.compact(); // "$1.2K" (compact notation)
```

## Currency Conversion

Convert between currencies using live exchange rates:

```typescript
import { Exchange } from '@toneflix/money';

// Set your API key
Exchange.setApiKey('your-api-key-here');

// Convert currency
const result = await Exchange.from('USD').to('EUR').convert(100);

console.log(result); // e.g., 92.5 (euros)

// Get formatted result
const formatted = await Exchange.from('USD').to('GBP').convert(100).format();

console.log(formatted); // e.g., "£85.23"
```

## Mathematical Operations

Perform calculations with proper precision:

```typescript
import { Money } from '@toneflix/money';

const price = new Money(99.99, 'USD');

// Basic operations
price.add(10).format(); // "$109.99"
price.subtract(5).format(); // "$94.99"
price.multiply(2).format(); // "$199.98"
price.divide(3).format(); // "$33.33"

// Rounding
price.round().format(); // "$100.00"
price.ceil().format(); // "$100.00"
price.floor().format(); // "$99.00"

// Chaining operations
const total = new Money(100, 'USD').add(50).multiply(2).subtract(25).round();

console.log(total.format()); // "$275.00"
```

## Setting Default Currency

Set a default currency for all Money instances:

```typescript
import { Money } from '@toneflix/money';

Money.setDefaultCurrency('EUR');

const money = new Money(100);
money.format(); // "€100.00"
```

## Negative Numbers

Handle negative amounts with different styles:

```typescript
import { Money } from '@toneflix/money';

const money = new Money(-100, 'USD');

// Minus sign (default)
money.setNegativeStyle('minus');
money.format(); // "-$100.00"

// Parentheses (accounting style)
money.setNegativeStyle('parentheses');
money.format(); // "($100.00)"
```

## Next Steps

- Learn more about [Money Formatting](/guide/money-formatting)
- Explore [Currency Conversion](/guide/currency-conversion)
- Master [Mathematical Operations](/guide/math-operations)
- Check the [API Reference](/api/money)
