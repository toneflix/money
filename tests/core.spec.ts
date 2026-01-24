import { afterEach, describe, expect, it } from 'vitest'

import { Money } from '../src/money'

describe('Money', () => {
    afterEach(() => {
        Money.setDefaultCurrency('USD')
    })

    describe('formatNumber', () => {
        it('should format number with correct decimals', () => {
            const amount = 123456
            const money = new Money(amount)
            const formatted = money['formatNumber'](amount, 2)
            expect(formatted).toBe('123,456.00')
        })

        it('should format number without decimals', () => {
            const amount = 123456
            const money = new Money(amount)
            const formatted = money['formatNumber'](amount, 0)
            expect(formatted).toBe('123,456')
        })

        it('should format number with one decimal', () => {
            const amount = 123456.7
            const money = new Money(amount)
            const formatted = money['formatNumber'](amount, 1)
            expect(formatted).toBe('123,456.7')
        })
    })

    describe('convert', () => {
        it('should convert amount to specified currency', async () => {
            const money = new Money(100, 'USD')
            const converted = await money.convert('EUR')
            expect(converted).toBeInstanceOf(Money)
            expect(converted.currencyCode()).toBe('EUR')
        })

        it('should convert statically to specified currency', async () => {
            const converted = await Money.convert(100, 'USD', 'GBP')
            expect(converted).toBeInstanceOf(Money)
            expect(converted.currencyCode()).toBe('GBP')
        })
    })

    describe('applyNegative', () => {
        it('should apply negative style correctly', () => {
            const amount = -123
            const money = new Money(amount)
            const formatted = money['applyNegative']('123.00', true)
            expect(formatted).toBe('-123.00')
        })

        it('should not apply negative style for positive amounts', () => {
            const amount = 123
            const money = new Money(amount)
            const formatted = money['applyNegative']('123.00', false)
            expect(formatted).toBe('123.00')
        })
    })

    describe('placeSymbol', () => {
        it('should place symbol before number', () => {
            const money = new Money(100)
            const result = money['placeSymbol']('$', '100.00', 'before')
            expect(result).toBe('$100.00')
        })

        it('should place symbol after number', () => {
            const money = new Money(100)
            const result = money['placeSymbol']('€', '100.00', 'after')
            expect(result).toBe('100.00€')
        })
    })

    describe('format', () => {
        it('should format amount correctly with currency symbol', () => {
            const money = new Money(1234.56, 'USD')
            const formatted = money.format()
            expect(formatted).toBe('$1,234.56')
        })

        it('should format negative amount with parentheses', () => {
            const money = new Money(-1234.56, 'USD')
            money.setNegativeStyle('parentheses')
            const formatted = money.format()
            expect(formatted).toBe('($1,234.56)')
        })

        it('should format negative amount with minus sign', () => {
            const money = new Money(-1234.56, 'USD')
            money.setNegativeStyle('minus')
            const formatted = money.format()
            expect(formatted).toBe('-$1,234.56')
        })
    })

    describe('whole', () => {
        it('should format whole amount without decimals', () => {
            const money = new Money(1234.01, 'USD')
            const formatted = money.whole()
            expect(formatted).toBe('$1,234')
        })
    })

    describe('compact', () => {
        it('should format amount in compact form', () => {
            const money = new Money(1234567, 'USD')
            const formatted = money.compact()
            expect(formatted).toBe('$1.2M')
        })

        it('should format small amount in compact form', () => {
            const money = new Money(123, 'USD')
            const formatted = money.compact()
            expect(formatted).toBe('$123')
        })
    })

    describe('currencyCode', () => {
        it('should return correct currency code', () => {
            const money = new Money(100, 'EUR')
            const code = money.currencyCode()
            expect(code).toBe('EUR')
        })

        it('should return default currency code when none is provided', () => {
            const money = new Money(100)
            const code = money.currencyCode()
            expect(code).toBe('USD') // assuming USD is the default
        })
    })

    describe('currencySymbol', () => {
        it('should return correct currency symbol', () => {
            const money = new Money(100, 'GBP')
            const symbol = money.currencySymbol()
            expect(symbol).toBe('£')
        })
    })

    describe('toString', () => {
        it('should return formatted string representation of money', () => {
            const money = new Money(1234.56, 'USD')
            const str = money.toString()
            expect(str).toBe('$1,234.56')
        })

        it('should return formatted string for negative amount', () => {
            const money = new Money(-1234.56, 'USD')
            money.setNegativeStyle('minus')
            const str = money.toString()
            expect(str).toBe('-$1,234.56')
        })

        it('should cast to string correctly', () => {
            const money = new Money(789.01, 'USD')
            const str = `${money}`
            expect(str).toBe('$789.01')
        })
    })
})