# Formatting Examples

Real-world examples of formatting currency with @toneflix/money.

## E-Commerce Product Display

```typescript
import { Money } from '@toneflix/money';

interface Product {
  name: string;
  price: number;
  currency: string;
}

function displayProduct(product: Product) {
  const price = Money.format(product.price, product.currency as any);
  return `${product.name}: ${price}`;
}

displayProduct({
  name: 'Laptop',
  price: 1299.99,
  currency: 'USD',
});
// Output: "Laptop: $1,299.99"
```

## Invoice Line Items

```typescript
const lineItems = [
  { description: 'Web Design', amount: 2500 },
  { description: 'Logo Design', amount: 500 },
  { description: 'Hosting', amount: 120 },
];

const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
const tax = subtotal * 0.08;
const total = subtotal + tax;

console.log(`Subtotal: ${Money.format(subtotal, 'USD')}`);
console.log(`Tax (8%): ${Money.format(tax, 'USD')}`);
console.log(`Total: ${Money.format(total, 'USD')}`);

// Output:
// Subtotal: $3,120.00
// Tax (8%): $249.60
// Total: $3,369.60
```

## Dashboard Statistics

```typescript
const stats = {
  revenue: 1234567.89,
  expenses: 456789.12,
  profit: 777778.77,
};

console.log('Monthly Stats');
console.log('-------------');
console.log(`Revenue:  ${Money.compact(stats.revenue, 'USD')}`);
console.log(`Expenses: ${Money.compact(stats.expenses, 'USD')}`);
console.log(`Profit:   ${Money.compact(stats.profit, 'USD')}`);

// Output:
// Monthly Stats
// -------------
// Revenue:  $1.2M
// Expenses: $456.8K
// Profit:   $777.8K
```

## Accounting Report

```typescript
const transactions = [
  { type: 'income', amount: 5000 },
  { type: 'expense', amount: -1200 },
  { type: 'expense', amount: -350 },
  { type: 'income', amount: 2500 },
];

transactions.forEach((tx) => {
  const money = new Money(tx.amount, 'USD');
  money.setNegativeStyle('parentheses');
  console.log(`${tx.type.padEnd(8)}: ${money.format()}`);
});

// Output:
// income  : $5,000.00
// expense : ($1,200.00)
// expense : ($350.00)
// income  : $2,500.00
```

## Multi-Currency Price List

```typescript
const products = [
  { name: 'Basic Plan', price: 9.99 },
  { name: 'Pro Plan', price: 29.99 },
  { name: 'Enterprise', price: 99.99 },
];

const currencies = ['USD', 'EUR', 'GBP'];

currencies.forEach((currency) => {
  console.log(`\nPrices in ${currency}:`);
  products.forEach((product) => {
    const price = Money.format(product.price, currency as any);
    console.log(`  ${product.name}: ${price}`);
  });
});

// Output:
// Prices in USD:
//   Basic Plan: $9.99
//   Pro Plan: $29.99
//   Enterprise: $99.99
//
// Prices in EUR:
//   Basic Plan: €9.99
//   Pro Plan: €29.99
//   Enterprise: €99.99
```

## Responsive Formatting

```typescript
function formatResponsive(
  amount: number,
  currency: string,
  screenSize: 'mobile' | 'desktop',
) {
  const money = new Money(amount, currency as any);

  if (screenSize === 'mobile') {
    // Use compact notation on mobile
    return money.compact();
  } else {
    // Use full formatting on desktop
    return money.format();
  }
}

console.log(formatResponsive(1234567, 'USD', 'mobile')); // "$1.2M"
console.log(formatResponsive(1234567, 'USD', 'desktop')); // "$1,234,567.00"
```
