# Conversion Examples

Practical examples of currency conversion.

## Travel Budget Calculator

```typescript
import { Exchange, Money } from '@toneflix/money';

Exchange.setApiKey('your-api-key');

async function calculateTravelBudget(budgetUSD: number, destination: string) {
  const currencies: Record<string, string> = {
    europe: 'EUR',
    uk: 'GBP',
    japan: 'JPY',
    canada: 'CAD',
  };

  const targetCurrency = currencies[destination];
  const converted = await Exchange.from('USD')
    .to(targetCurrency)
    .convert(budgetUSD);

  const formatted = await Exchange.from('USD')
    .to(targetCurrency)
    .convert(budgetUSD)
    .format();

  console.log(`Budget for ${destination}:`);
  console.log(`  USD: ${Money.format(budgetUSD, 'USD')}`);
  console.log(`  ${targetCurrency}: ${formatted}`);

  return converted;
}

await calculateTravelBudget(2000, 'europe');
// Output:
// Budget for europe:
//   USD: $2,000.00
//   EUR: €1,850.00
```

## International Invoice

```typescript
async function createInternationalInvoice(
  items: Array<{ name: string; price: number }>,
  fromCurrency: string,
  toCurrency: string,
) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const convertedAmount = await Exchange.from(fromCurrency)
    .to(toCurrency)
    .convert(subtotal);

  console.log('Invoice Summary');
  console.log('---------------');
  items.forEach((item) => {
    console.log(`${item.name}: ${Money.format(item.price, fromCurrency)}`);
  });
  console.log('---------------');
  console.log(
    `Subtotal (${fromCurrency}): ${Money.format(subtotal, fromCurrency)}`,
  );
  console.log(
    `Subtotal (${toCurrency}): ${Money.format(convertedAmount, toCurrency)}`,
  );

  return convertedAmount;
}

await createInternationalInvoice(
  [
    { name: 'Consulting', price: 1500 },
    { name: 'Development', price: 3500 },
  ],
  'USD',
  'EUR',
);
```

## Price Comparison Tool

```typescript
async function comparePrices(
  prices: Array<{ amount: number; currency: string }>,
) {
  const baseCurrency = 'USD';

  console.log('Price Comparison (converted to USD):');

  for (const price of prices) {
    if (price.currency === baseCurrency) {
      console.log(
        `${Money.format(price.amount, price.currency)} = ${Money.format(price.amount, 'USD')}`,
      );
    } else {
      const converted = await Exchange.from(price.currency)
        .to(baseCurrency)
        .convert(price.amount);

      console.log(
        `${Money.format(price.amount, price.currency)} = ${Money.format(converted, 'USD')}`,
      );
    }
  }
}

await comparePrices([
  { amount: 100, currency: 'USD' },
  { amount: 85, currency: 'EUR' },
  { amount: 75, currency: 'GBP' },
  { amount: 12000, currency: 'JPY' },
]);

// Output:
// Price Comparison (converted to USD):
// $100.00 = $100.00
// €85.00 = $92.50
// £75.00 = $95.25
// ¥12,000.00 = $90.50
```

## Real-time Exchange Display

```typescript
async function displayExchangeRates(baseCurrency: string, targets: string[]) {
  console.log(`Exchange rates for ${baseCurrency}:`);

  for (const target of targets) {
    const rate = await Exchange.from(baseCurrency).to(target).rate();

    const amount = await Exchange.from(baseCurrency)
      .to(target)
      .convert(100)
      .format();

    console.log(`1 ${baseCurrency} = ${rate.toFixed(4)} ${target}`);
    console.log(`100 ${baseCurrency} = ${amount}`);
    console.log();
  }
}

await displayExchangeRates('USD', ['EUR', 'GBP', 'JPY']);

// Output:
// Exchange rates for USD:
// 1 USD = 0.9250 EUR
// 100 USD = €92.50
//
// 1 USD = 0.7800 GBP
// 100 USD = £78.00
//
// 1 USD = 150.2500 JPY
// 100 USD = ¥15,025.00
```

## Subscription Plan Converter

```typescript
async function displaySubscriptionPrices(
  planName: string,
  priceUSD: number,
  availableCurrencies: string[],
) {
  console.log(`${planName} Subscription`);
  console.log('-------------------');

  for (const currency of availableCurrencies) {
    const price = await Exchange.from('USD')
      .to(currency)
      .convert(priceUSD)
      .format();

    console.log(`${currency}: ${price}/month`);
  }
}

await displaySubscriptionPrices('Pro Plan', 29.99, [
  'USD',
  'EUR',
  'GBP',
  'CAD',
]);

// Output:
// Pro Plan Subscription
// -------------------
// USD: $29.99/month
// EUR: €27.74/month
// GBP: £23.39/month
// CAD: $40.79/month
```

## Shopping Cart Total

```typescript
async function calculateCartTotal(
  items: Array<{ name: string; price: number; currency: string }>,
  displayCurrency: string,
) {
  let total = 0;

  console.log('Shopping Cart:');

  for (const item of items) {
    const converted = await Exchange.from(item.currency)
      .to(displayCurrency)
      .convert(item.price);

    total += converted;

    console.log(
      `${item.name}: ${Money.format(item.price, item.currency)} → ${Money.format(converted, displayCurrency)}`,
    );
  }

  console.log('-------------------');
  console.log(`Total: ${Money.format(total, displayCurrency)}`);

  return total;
}

await calculateCartTotal(
  [
    { name: 'Shirt', price: 29.99, currency: 'USD' },
    { name: 'Shoes', price: 75.0, currency: 'EUR' },
    { name: 'Watch', price: 120.0, currency: 'GBP' },
  ],
  'USD',
);
```
