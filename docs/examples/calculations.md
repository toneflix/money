# Calculation Examples

Practical examples of mathematical operations with money.

## Restaurant Bill Splitter

```typescript
import { Money } from '@toneflix/money';

function splitBill(total: number, people: number, tipPercent: number = 0.15) {
  const bill = new Money(total, 'USD');
  const tip = bill.multiply(tipPercent).round(2);
  const totalWithTip = bill.add(tip);
  const perPerson = totalWithTip.divide(people).round(2);

  console.log('Bill Summary:');
  console.log(`Subtotal: ${bill.format()}`);
  console.log(`Tip (${tipPercent * 100}%): ${tip.format()}`);
  console.log(`Total: ${totalWithTip.format()}`);
  console.log(`Per person (${people}): ${perPerson.format()}`);

  return perPerson;
}

splitBill(85.5, 4, 0.18);

// Output:
// Bill Summary:
// Subtotal: $85.50
// Tip (18%): $15.39
// Total: $100.89
// Per person (4): $25.22
```

## Sales Tax Calculator

```typescript
function calculateWithTax(price: number, taxRate: number, state: string) {
  const basePrice = new Money(price, 'USD');
  const tax = basePrice.multiply(taxRate).round(2);
  const total = basePrice.add(tax);

  console.log(`Purchase in ${state}:`);
  console.log(`Base price: ${basePrice.format()}`);
  console.log(`Tax (${taxRate * 100}%): ${tax.format()}`);
  console.log(`Total: ${total.format()}`);

  return { basePrice, tax, total };
}

calculateWithTax(199.99, 0.0875, 'California');

// Output:
// Purchase in California:
// Base price: $199.99
// Tax (8.75%): $17.50
// Total: $217.49
```

## Discount Calculator

```typescript
function applyDiscount(
  originalPrice: number,
  discountType: 'percent' | 'fixed',
  value: number,
) {
  const price = new Money(originalPrice, 'USD');
  let discount: Money;

  if (discountType === 'percent') {
    discount = price.multiply(value).round(2);
  } else {
    discount = new Money(value, 'USD');
  }

  const finalPrice = price.subtract(discount);
  const savings = price.subtract(finalPrice);

  console.log('Discount Applied:');
  console.log(`Original: ${price.format()}`);
  console.log(`Discount: ${discount.format()}`);
  console.log(`Final: ${finalPrice.format()}`);
  console.log(`You save: ${savings.format()}`);

  return finalPrice;
}

applyDiscount(150, 'percent', 0.2); // 20% off

// Output:
// Discount Applied:
// Original: $150.00
// Discount: $30.00
// Final: $120.00
// You save: $30.00
```

## Compound Interest Calculator

```typescript
function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundingsPerYear: number = 12,
) {
  let amount = new Money(principal, 'USD');
  const rate = annualRate / compoundingsPerYear;
  const periods = years * compoundingsPerYear;

  // A = P(1 + r)^n
  for (let i = 0; i < periods; i++) {
    const interest = amount.multiply(rate);
    amount = amount.add(interest);
  }

  const totalInterest = amount.subtract(principal);

  console.log('Compound Interest Calculation:');
  console.log(`Principal: ${Money.format(principal, 'USD')}`);
  console.log(`Rate: ${annualRate * 100}% annually`);
  console.log(`Time: ${years} years`);
  console.log(`Final amount: ${amount.round(2).format()}`);
  console.log(`Total interest: ${totalInterest.round(2).format()}`);

  return amount;
}

calculateCompoundInterest(10000, 0.05, 5);

// Output:
// Compound Interest Calculation:
// Principal: $10,000.00
// Rate: 5% annually
// Time: 5 years
// Final amount: $12,833.59
// Total interest: $2,833.59
```

## Budget Allocation

```typescript
function allocateBudget(
  totalBudget: number,
  categories: Record<string, number>,
) {
  const budget = new Money(totalBudget, 'USD');
  let allocated = new Money(0, 'USD');

  console.log('Budget Allocation:');
  console.log(`Total Budget: ${budget.format()}`);
  console.log('-------------------');

  Object.entries(categories).forEach(([category, percentage]) => {
    const amount = budget.multiply(percentage).round(2);
    allocated = allocated.add(amount);
    console.log(`${category}: ${amount.format()} (${percentage * 100}%)`);
  });

  const remaining = budget.subtract(allocated);
  console.log('-------------------');
  console.log(`Remaining: ${remaining.format()}`);

  return { allocated, remaining };
}

allocateBudget(5000, {
  Housing: 0.3,
  Food: 0.15,
  Transportation: 0.1,
  Savings: 0.2,
  Entertainment: 0.1,
});

// Output:
// Budget Allocation:
// Total Budget: $5,000.00
// -------------------
// Housing: $1,500.00 (30%)
// Food: $750.00 (15%)
// Transportation: $500.00 (10%)
// Savings: $1,000.00 (20%)
// Entertainment: $500.00 (10%)
// -------------------
// Remaining: $750.00
```

## Profit Margin Calculator

```typescript
function calculateProfitMargin(cost: number, sellingPrice: number) {
  const costAmount = new Money(cost, 'USD');
  const sellPrice = new Money(sellingPrice, 'USD');

  const profit = sellPrice.subtract(cost);
  const margin = profit.divide(sellingPrice).multiply(100).round(2);
  const markup = profit.divide(cost).multiply(100).round(2);

  console.log('Profit Analysis:');
  console.log(`Cost: ${costAmount.format()}`);
  console.log(`Selling Price: ${sellPrice.format()}`);
  console.log(`Profit: ${profit.format()}`);
  console.log(`Margin: ${margin}%`);
  console.log(`Markup: ${markup}%`);

  return { profit, margin, markup };
}

calculateProfitMargin(75, 120);

// Output:
// Profit Analysis:
// Cost: $75.00
// Selling Price: $120.00
// Profit: $45.00
// Margin: 37.50%
// Markup: 60.00%
```

## Expense Tracker

```typescript
function trackExpenses(
  transactions: Array<{ description: string; amount: number }>,
) {
  let total = new Money(0, 'USD');

  console.log('Expense Tracker:');
  console.log('-------------------');

  transactions.forEach((tx) => {
    const amount = new Money(tx.amount, 'USD');
    total = total.add(amount);
    console.log(`${tx.description}: ${amount.format()}`);
  });

  console.log('-------------------');
  console.log(`Total Expenses: ${total.format()}`);

  const average = total.divide(transactions.length).round(2);
  console.log(`Average: ${average.format()}`);

  return { total, average };
}

trackExpenses([
  { description: 'Groceries', amount: 125.5 },
  { description: 'Gas', amount: 45.0 },
  { description: 'Dining', amount: 85.25 },
  { description: 'Shopping', amount: 200.0 },
]);

// Output:
// Expense Tracker:
// -------------------
// Groceries: $125.50
// Gas: $45.00
// Dining: $85.25
// Shopping: $200.00
// -------------------
// Total Expenses: $455.75
// Average: $113.94
```
