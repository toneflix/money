# Money Class

The Money class handles currency formatting, display, and mathematical operations.

## Constructor

```typescript
new Money(amount?: number | string, currency?: CurrencyCode)
```

Create a new Money instance.

**Parameters:**

- `amount` - The monetary amount (optional)
- `currency` - Currency code like 'USD', 'EUR', 'GBP' (optional)

**Example:**

```typescript
const money = new Money(1234.56, 'USD');
```

## Static Methods

### setDefaultCurrency()

```typescript
Money.setDefaultCurrency(currency: CurrencyCode): void
```

Set the default currency for all Money instances.

### of()

```typescript
Money.of(amount: number | string, currency?: CurrencyCode): Money
```

Factory method to create a Money instance.

### format()

```typescript
Money.format(amount: number | string, currency?: CurrencyCode): string
```

Format an amount as currency (static method).

### whole()

```typescript
Money.whole(amount: number | string, currency?: CurrencyCode): string
```

Format without decimal places (static method).

### compact()

```typescript
Money.compact(amount: number | string, currency?: CurrencyCode): string
```

Format in compact notation (static method).

### convert()

```typescript
Money.convert(amount: number | string, from: CurrencyCode, to: CurrencyCode): Promise<Money>
```

Convert amount between currencies (static method).

### currencyCode()

```typescript
Money.currencyCode(): CurrencyCode
```

Get the default currency code (static method).

### currencySymbol()

```typescript
Money.currencySymbol(): string
```

Get the default currency symbol (static method).

## Instance Methods

### Formatting Methods

#### format()

```typescript
format(): string
```

Format the amount with currency symbol and proper formatting.

#### whole()

```typescript
whole(): string
```

Format without decimal places.

#### compact()

```typescript
compact(): string
```

Format in compact notation (K, M, B, T).

### Arithmetic Methods

#### add()

```typescript
add(other: number | string | Money): Money
```

Add another amount.

#### subtract()

```typescript
subtract(other: number | string | Money): Money
```

Subtract another amount.

#### multiply()

```typescript
multiply(factor: number | string | Money): Money
```

Multiply by a factor.

#### divide()

```typescript
divide(divisor: number | string | Money): Money
```

Divide by a divisor.

### Rounding Methods

#### round()

```typescript
round(digits?: number): Money
```

Round to specified decimal places (default: 0).

#### ceil()

```typescript
ceil(): Money
```

Round up to nearest integer.

#### floor()

```typescript
floor(): Money
```

Round down to nearest integer.

### Other Methods

#### absolute()

```typescript
absolute(): Money
```

Get absolute value.

#### mod()

```typescript
mod(divisor: number | string | Money): Money
```

Calculate modulus (remainder).

#### share()

```typescript
share(total: number | string | Money, ratio: string | number): Money
```

Calculate proportional share.

#### convert()

```typescript
convert(to: CurrencyCode): Promise<Money>
```

Convert to another currency.

#### setNegativeStyle()

```typescript
setNegativeStyle(style: 'minus' | 'parentheses'): void
```

Set how negative amounts are displayed.

#### currencyCode()

```typescript
currencyCode(): CurrencyCode
```

Get the currency code.

#### currencySymbol()

```typescript
currencySymbol(): string
```

Get the currency symbol.

#### toString()

```typescript
toString(): string
```

Get string representation (same as format()).

## Types

### CurrencyCode

```typescript
type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | /* ... many more */
```

Union type of all supported currency codes.

### Currency

```typescript
type Currency = {
  code: CurrencyCode;
  symbol: string;
};
```

Currency object with code and symbol.
