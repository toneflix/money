import { describe, expect, it } from 'vitest'

import { Exchange } from '../src/exchange'

describe('Exchange', () => {
    describe('convert', () => {
        it('should convert amount correctly', async () => {
            const exchange = new Exchange('USD', 'EUR')
            const result = await exchange.convert(100)

            expect(result).toBeGreaterThan(0)
        })

        it('should be chainable', async () => {
            const exchange = new Exchange()
            const result = await exchange
                .from('USD')
                .to('GBP')
                .convert(50)

            expect(result).toBeGreaterThan(0)
        })
    })

    describe('from', () => {
        const exchange = new Exchange()
        it('should set source currency correctly', () => {
            exchange.from('GBP')
            expect((exchange as any).source).toBe('GBP')
        })

        it('should be statically chainable', () => {
            const ex = Exchange.from('AUD')
            expect((ex as any).source).toBe('AUD')
        })
    })

    describe('format', () => {
        it('should format converted amount correctly', async () => {
            const exchange = new Exchange('USD', 'CAD', 200)
            const formatted = await exchange.convert(200).format()
            expect(formatted).toMatch(/^\$\d+/)
        })

        it('should format converted amount statically', async () => {
            const formatted = await Exchange.format(150, 'EUR', 'USD')
            expect(formatted).toMatch(/^\$\d+/)
        })
    })

    describe('rate', () => {
        it('should set caller to get exchange rate', () => {
            const exchange = new Exchange('USD', 'EUR')
            exchange.rate()
            expect(exchange['caller']).not.toBeNull()
        })

        it('should throw error if source currency is not specified', () => {
            const exchange = new Exchange(undefined, 'EUR')
            expect(() => exchange.rate())
                .toThrow('Source currency not specified')
        })

        it('should throw error if target currency is not specified', () => {
            const exchange = new Exchange('USD', undefined)
            expect(() => exchange.rate())
                .toThrow('Target currency not specified')
        })

        it('should be return exchange rate when awaited', async () => {
            const exchange = new Exchange('USD', 'JPY')
            const rate = await exchange.rate()
            expect(rate).toBeGreaterThan(0)
        })
    })

    describe('to', () => {
        it('should set target currency correctly', () => {
            const exchange = new Exchange()
            exchange.to('JPY')
            expect((exchange as any).target).toBe('JPY')
        })

        it('should be statically chainable', () => {
            const ex = Exchange.to('CAD')
            expect((ex as any).target).toBe('CAD')
        })
    })

    describe('send', () => {
        it('should throw error if source currency is not specified', async () => {
            const exchange = new Exchange()
            await expect(async () => exchange.convert(100, undefined, 'EUR'))
                .rejects
                .toThrow('Source currency not specified')
        })

        it('should throw error if target currency is not specified', async () => {
            const exchange = new Exchange()
            await expect(async () => exchange.convert(100, 'USD', undefined))
                .rejects
                .toThrow('Target currency not specified')
        })

        it('should throw error if API key is missing', async () => {
            const ExchangeClone = Exchange
            ExchangeClone['apiKey'] = ''
            process.env.EXCHANGERATE_API_KEY = ''

            const exchange = new ExchangeClone('USD', 'EUR')
            await expect(async () => exchange.convert(100))
                .rejects
                .toThrow('API Key is missing or the provided API Key is invalid. Please check and try again.')
        })

        it('should throw error for invalid API key', async () => {
            Exchange.setApiKey('invalid-key')

            const exchange = new Exchange('USD', 'EUR')
            await expect(async () => exchange.convert(100))
                .rejects
                .toThrow('The account is inactive. Please contact support for assistance.')
        })
    })
})