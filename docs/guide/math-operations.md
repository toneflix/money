# Mathematical Operations

Perform precise calculations with money amounts.

## Basic Arithmetic

### Addition

Add amounts together:

```typescript
import { Money } from '@toneflix/money';

const money = new Money(100, 'USD');
const result = money.add(50);

console.log(result.format()); // "$150.00"

// Add another Money instance
const other = new Money(25, 'USD');
money.add(other).format(); // "$125.00"
```

### Subtraction

Subtract amounts:

```typescript
const money = new Money(100, 'USD');
const result = money.subtract(30);

console.log(result.format()); // "$70.00"
```

### Multiplication

Multiply by a factor:

```typescript
const money = new Money(50, 'USD');
const result = money.multiply(3);

console.log(result.format()); // "$150.00"
```

### Division

Divide by a divisor:

```typescript
const money = new Money(100, 'USD');
const result = money.divide(4);

console.log(result.format()); // "$25.00"
```

## Rounding Operations

### Round

Round to specified decimal places:

```typescript
const money = new Money(99.456, 'USD');

money.round().format(); // "$99.00" (default: 0 decimals)
money.round(1).format(); // "$99.50"
money.round(2).format(); // "$99.46"
```

### Ceil

Round up to nearest integer:

```typescript
const money = new Money(99.45, 'USD');
const result = money.ceil();

console.log(result.format()); // "$100.00"
```

### Floor

Round down to nearest integer:

```typescript
const money = new Money(99.95, 'USD');
const result = money.floor();

console.log(result.format()); // "$99.00"
```

## Advanced Operations

### Modulus

Calculate remainder after division:

```typescript
const money = new Money(100, 'USD');
const result = money.mod(30);

console.log(result.format()); // "$10.00" (100 % 30 = 10)
```

### Absolute Value

Get absolute value of an amount:

```typescript
const money = new Money(-100, 'USD');
const result = money.absolute();

console.log(result.format()); // "$100.00"
```

### Share Calculation

Calculate proportional shares:

```typescript
const money = new Money(100, 'USD');

// Calculate 10% share
const result = money.share(1000, 0.1);
console.log(result.format()); // "$10.00"

// Calculate proportional share
const part = new Money(25, 'USD');
const share = part.share(100, 0.5); // 50% of 25 relative to 100

console.log(share.format()); // "$12.50"
```

## Method Chaining

Combine multiple operations:

```typescript
const total = new Money(100, 'USD')
  .add(50) // $150
  .multiply(2) // $300
  .subtract(25) // $275
  .round(); // $275

console.log(total.format()); // "$275.00"
```

## Practical Examples

### Calculate Total with Tax

```typescript
const price = new Money(99.99, 'USD');
const taxRate = 0.08; // 8%

const tax = price.multiply(taxRate);
const total = price.add(tax);

console.log(total.format()); // "$107.99"
```

### Calculate Discount

```typescript
const originalPrice = new Money(200, 'USD');
const discountPercent = 0.2; // 20% off

const discount = originalPrice.multiply(discountPercent);
const finalPrice = originalPrice.subtract(discount);

console.log(finalPrice.format()); // "$160.00"
```

### Split Bill

```typescript
const total = new Money(150, 'USD');
const people = 4;

const perPerson = total.divide(people);

console.log(perPerson.format()); // "$37.50"
```

### Calculate Tip

```typescript
const bill = new Money(85.5, 'USD');
const tipPercent = 0.15; // 15%

const tip = bill.multiply(tipPercent).round(2);
const total = bill.add(tip);

console.log(tip.format()); // "$12.83"
console.log(total.format()); // "$98.33"
```

## Type Safety

All mathematical operations accept:

- `number` - Numeric values
- `string` - String representations of numbers
- `Money` - Other Money instances

```typescript
const money = new Money(100, 'USD');

money.add(50); // number
money.add('25'); // string
money.add(new Money(10, 'USD')); // Money instance
```
