import { CurrencyCode, Money } from './money'

import { ExchangeException } from './Exceptions/ExchangeException'
import { loadEnv } from './utils/env'

export class Exchange {
    private static apiKey: string

    result: number | string = 0
    caller: () => Promise<number> = async () => 0

    /**
     * 
     * @param from 
     * @param to 
     * @param rate 
     */
    constructor(
        private source?: CurrencyCode,
        private target?: CurrencyCode,
        private amount: number = 1,
    ) {
        // Load .env file if it exists
        loadEnv()
    }

    /**
     * Set API key
     * 
     * @param key 
     */
    static setApiKey (key: string) {
        Exchange.apiKey = key
    }

    /**
     * Convert amount from one currency to another
     * 
     * @param amount 
     * @param from 
     * @param to 
     * @returns 
     */
    convert (amount: number, source?: CurrencyCode, target?: CurrencyCode): this {
        if (!source && !this.source)
            throw new ExchangeException('missing-source')

        if (!target && !this.target)
            throw new ExchangeException('missing-target')

        this.source = source ?? this.source
        this.target = target ?? this.target
        this.amount = amount

        this.caller = async () => await this.send()

        return this
    }

    /**
     * Get exchange rate
     * 
     * @param source 
     * @param target 
     * @returns 
     */
    rate (source?: CurrencyCode, target?: CurrencyCode): this {
        if (!source && !this.source)
            throw new ExchangeException('missing-source')

        if (!target && !this.target)
            throw new ExchangeException('missing-target')

        this.source = source ?? this.source
        this.target = target ?? this.target

        this.caller = async () => await this.send(true)

        return this
    }

    /**
     * Set source currency
     * 
     * @param from 
     * @returns 
     */
    from (from: CurrencyCode): this {
        this.source = from

        return this
    }

    /**
     * Set target currency
     * 
     * @param to 
     * @returns 
     */
    to (to: CurrencyCode): this {
        this.target = to

        return this
    }

    /**
     * Set source currency statically
     * 
     * @param from 
     * @returns 
     */
    static from (from: CurrencyCode): Exchange {
        const exchange = new Exchange()
        exchange.from(from)

        return exchange
    }

    /**
     * Set target currency statically
     * 
     * @param to 
     * @returns 
     */
    static to (to: CurrencyCode): Exchange {
        const exchange = new Exchange()
        exchange.to(to)

        return exchange
    }

    /**
     * Format converted amount
     * 
     * @returns 
     */
    async format (): Promise<string> {
        return new Money(await this.caller(), this.target).format()
    }

    /**
     * Format converted amount statically
     * 
     * @param amount 
     * @param from 
     * @param to 
     * @returns 
     */
    static format = async (
        amount: number,
        from: CurrencyCode,
        to: CurrencyCode
    ): Promise<string> => {
        const exchange = new Exchange(from, to, amount)
        const result = await exchange.convert(amount).format()

        return result
    }

    /**
     * Send request to exchange API
     * 
     * @param getRate 
     * @returns 
     */
    private async send (getRate?: boolean): Promise<number> {
        if (
            (!Exchange.apiKey && !process.env.EXCHANGERATE_API_KEY) ||
            Exchange.apiKey === ''
        ) {
            throw new ExchangeException('missing-key')
        }

        const apiKey = Exchange.apiKey ?? process.env.EXCHANGERATE_API_KEY!
        const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}`

        try {
            const result = await fetch(`${baseUrl}/pair/${this.source}/${this.target}/${this.amount}`)
            const data = await result.json()
            if (data.result === 'success') {
                return Promise.resolve(getRate ? data.conversion_rate : data.conversion_result)
            }
            throw new ExchangeException(data['error-type'] || 'An error occurred while fetching exchange rate')
        } catch (error: any) {
            throw new ExchangeException(error)
        }
    }

    /**
     * Makes the Exchange class "thenable" so it can be awaited
     * Automatically executes the chain when awaited or .then() is called
     * 
     * @param onFulfilled 
     * @param onRejected 
     * @returns 
     */
    then<T> (
        onFulfilled?: (value: number) => T | PromiseLike<T>,
        onRejected?: (reason: any) => T | PromiseLike<T>
    ): Promise<T> {
        return this.caller().then(onFulfilled, onRejected)
    }

    /**
     * Catch errors in the promise chain
     * 
     * @param onRejected 
     * @returns 
     */
    catch<T> (onRejected?: (reason: any) => T | PromiseLike<T>): Promise<T> {
        return this.caller().then(undefined, onRejected)
    }

    /**
     * Finally handler for the promise chain
     * 
     * @param onFinally 
     * @returns 
     */
    finally (onFinally?: (() => void) | null): Promise<number> {
        return this.caller().finally(onFinally)
    }
}