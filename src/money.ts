import { Exchange } from './exchange'
import { currencies } from './currencies'

export type CurrencyCode = typeof currencies[number]['code'];

/**
 * Currency Type
 */
export type Currency = {
    code: CurrencyCode;
    symbol: string;
};

/**
 * Negative Amount Style
 */
type NegativeStyle = 'minus' | 'parentheses';

/**
 * Normalized Currency Format
 */
type NormalizedCurrency = {
    symbol: string;
    decimals: number;
    position: 'before' | 'after';
};

/**
 * Money Formatter Class
 */
export class Money {
    private static currency: CurrencyCode = 'USD'

    private negativeStyle: NegativeStyle = 'minus'

    /**
     * Currency Map
     */
    readonly #currencyMap: Record<string, NormalizedCurrency> =
        Object.fromEntries(
            currencies.map((c) => [
                c.code,
                {
                    symbol: c.symbol,
                    decimals: 2,
                    position: 'before',
                },
            ])
        )

    /**
     * 
     * @param amount 
     * @param currency 
     */
    constructor(private amount?: number | string, currency?: CurrencyCode) {
        if (currency) {
            Money.currency = currency
        }
    }

    static setDefaultCurrency (currency: CurrencyCode) {
        Money.currency = currency
    }

    /**
     * Set the style for negative amounts
     * 
     * @param style 
     */
    setNegativeStyle (style: NegativeStyle) {
        this.negativeStyle = style
    }

    /**
     * Create a Money formatter for a specific amount and currency
     * 
     * @param amount 
     * @param currency 
     * @returns 
     */
    static of (amount: number | string, currency?: CurrencyCode) {
        return new Money(amount, currency)
    }

    /**
     * Format number with commas and decimals
     * 
     * @param value 
     * @param decimals 
     * @returns 
     */
    private formatNumber (value: number, decimals: number): string {
        const fixed = value.toFixed(decimals)
        const [int, frac] = fixed.split('.')
        const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        return frac ? `${withCommas}.${frac}` : withCommas
    }

    private regularizedAmount (): number {
        return typeof this.amount === 'string' ? parseFloat(this.amount) : this.amount || 0
    }

    /**
     * Apply negative style to formatted value
     * 
     * @param value 
     * @param isNegative 
     * @returns 
     */
    private applyNegative (value: string, isNegative: boolean): string {
        if (!isNegative) return value

        return this.negativeStyle === 'parentheses'
            ? `(${value})`
            : `-${value}`
    }

    /**
     * Place currency symbol before or after number
     * 
     * @param symbol 
     * @param number 
     * @param position 
     * @returns 
     */
    private placeSymbol (
        symbol: string,
        number: string,
        position: 'before' | 'after'
    ): string {
        return position === 'after'
            ? `${number}${symbol}`
            : `${symbol}${number}`
    }

    /**
     * Format amount to currency string
     * 
     * @returns 
     */
    format () {
        const c = this.#currencyMap[Money.currency]
        if (!c) return `${Money.currency} ${this.amount}`

        const isNegative = this.regularizedAmount() < 0
        const absolute = Math.abs(this.regularizedAmount())
        const number = this.formatNumber(absolute, c.decimals)
        const formatted = this.placeSymbol(c.symbol, number, c.position)

        return this.applyNegative(formatted, isNegative)
    }

    /**
     * Format whole amount without decimals
     * 
     * @returns 
     */
    whole () {
        const c = this.#currencyMap[Money.currency]
        if (!c) return `${Money.currency} ${this.amount}`

        const isNegative = this.regularizedAmount() < 0
        const absolute = Math.abs(this.regularizedAmount())
        const number = this.formatNumber(absolute, 0)
        const formatted = this.placeSymbol(c.symbol, number, c.position)

        return this.applyNegative(formatted, isNegative)
    }

    /**
     * Format compact amount
     * 
     * @returns 
     */
    compact () {
        const c = this.#currencyMap[Money.currency]
        if (!c) return `${Money.currency} ${this.amount}`

        const isNegative = this.regularizedAmount() < 0
        let value = Math.abs(this.regularizedAmount())
        const units = [
            { v: 1e12, s: 'T' },
            { v: 1e9, s: 'B' },
            { v: 1e6, s: 'M' },
            { v: 1e3, s: 'K' },
        ]

        let suffix = ''
        for (const u of units) {
            if (value >= u.v) {
                value /= u.v
                suffix = u.s
                break
            }
        }

        const number =
            value.toFixed(1).replace(/\.0$/, '') + suffix

        const formatted = this.placeSymbol(c.symbol, number, c.position)

        return this.applyNegative(formatted, isNegative)
    }

    /**
     * Convert amount to specified currency
     * 
     * @param to 
     * @returns 
     */
    async convert (to: CurrencyCode) {
        return Money.of(
            await Exchange
                .from(Money.currency)
                .to(to)
                .convert(this.regularizedAmount()),
            to
        )
    }

    /**
     * Statically convert amount to specified currency
     * 
     * @param to 
     * @returns 
     */
    static async convert (amount: number | string, from: CurrencyCode, to: CurrencyCode) {
        return Money.of(amount, from).convert(to)
    }

    /**
     * Get current currency code
     * 
     * @returns 
     */
    currencyCode (): CurrencyCode {
        return Money.currency
    }

    /**
     * Get current currency symbol
     * 
     * @returns 
     */
    currencySymbol (): string {
        const c = this.#currencyMap[Money.currency]

        return c ? c.symbol : Money.currency
    }

    /**
     * Format amount staticly
     * 
     * @param amount 
     * @param currencyCode 
     * @returns 
     */
    static format (amount: number | string, currencyCode?: CurrencyCode): string {
        return Money.of(amount, currencyCode).format()
    }

    /**
     * Format whole amount staticly
     * 
     * @param amount 
     * @param currencyCode 
     * @returns 
     */
    static whole (amount: number | string, currencyCode?: CurrencyCode): string {
        return Money.of(amount, currencyCode).whole()
    }

    /**
     * Format compact amount staticly
     * 
     * @param amount 
     * @param currencyCode 
     * @returns 
     */
    static compact (amount: number | string, currencyCode?: CurrencyCode): string {
        return Money.of(amount, currencyCode).compact()
    }

    /**
     * Get current currency symbol staticly
     * 
     * @returns 
     */
    static currencySymbol (): string {
        const c = (new Money()).#currencyMap[Money.currency]

        return c ? c.symbol : Money.currency
    }

    /**
     * Get current currency code staticly
     * 
     * @returns 
     */
    static currencyCode (): CurrencyCode {
        return Money.currency
    }

    /**
     * String representation of Money
     * 
     * @returns 
     */
    toString () {
        return this.format()
    }
}