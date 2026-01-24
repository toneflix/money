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

    describe('Calculator', () => {
        describe('add', () => {
            it('should add two Money instances correctly', () => {
                const money1 = new Money(100, 'USD')
                const money2 = new Money(50, 'USD')
                const result = money1.add(money2)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$150.00')
            })

            it('should add number to Money instance correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.add(25)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$125.00')
            })

            it('should add string amount to Money instance correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.add('30.50')
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$130.50')
            })
        })

        describe('subtract', () => {
            it('should subtract two Money instances correctly', () => {
                const money1 = new Money(100, 'USD')
                const money2 = new Money(40, 'USD')
                const result = money1.subtract(money2)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$60.00')
            })

            it('should subtract number from Money instance correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.subtract(20)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$80.00')
            })

            it('should subtract string amount from Money instance correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.subtract('15.75')
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$84.25')
            })
        })

        describe('multiply', () => {
            it('should multiply Money instance by number correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.multiply(2)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$200.00')
            })

            it('should multiply Money instance by string amount correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.multiply('1.5')
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$150.00')
            })
        })

        describe('divide', () => {
            it('should divide Money instance by number correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.divide(4)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$25.00')
            })

            it('should divide Money instance by string amount correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.divide('2')
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$50.00')
            })

            it('should throw error when dividing by zero', () => {
                const money = new Money(100, 'USD')
                expect(() => money.divide(0)).toThrowError('Division by zero')
            })
        })

        describe('ceil', () => {
            it('should round up Money instance correctly', () => {
                const money = new Money(99.12, 'USD')
                const result = money.ceil()
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$100.00')
            })
        })

        describe('floor', () => {
            it('should round down Money instance correctly', () => {
                const money = new Money(99.87, 'USD')
                const result = money.floor()
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$99.00')
            })
        })

        describe('round', () => {
            it('should round Money instance to specified digits correctly', () => {
                const money = new Money(99.876, 'USD')
                const result = money.round(2)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$99.88')
            })
        })

        describe('mod', () => {
            it('should calculate modulus of Money instance correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.mod(30)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$10.00')
            })

            it('should calculate modulus with string divisor correctly', () => {
                const money = new Money(100, 'USD')
                const result = money.mod('45')
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$10.00')
            })

            it('should calculate modulus with Money divisor correctly', () => {
                const money = new Money(100, 'USD')
                const divisor = new Money(33, 'USD')
                const result = money.mod(divisor)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$1.00')
            })
        })

        describe('absolute', () => {
            it('should return absolute value of Money instance correctly', () => {
                const money = new Money(-150, 'USD')
                const result = money.absolute()
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$150.00')
            })
        })

        describe('share', () => {
            it('should calculate share of Money instance correctly', () => {
                const money = new Money(200, 'USD')
                const result = money.share(1000, 500)
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$100.00')
            })

            it('should calculate share with string inputs correctly', () => {
                const money = new Money(200, 'USD')
                const result = money.share('1000', '500')
                expect(result).toBeInstanceOf(Money)
                expect(result.format()).toBe('$100.00')
            })
        })
    })
})