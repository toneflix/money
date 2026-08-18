import {
    CurrencyCode,
    ExchangeRateContract,
    ExchangeRateInput,
} from '../../types'

import { ExchangeException } from '../../Exceptions/ExchangeException'
import { loadEnv } from '../../utils/env'

/**
 * https://exchangerate-api.com Exchange Rate Conversion Provider
 */
export class ExchangeRateApi implements ExchangeRateContract {
    private config: ExchangeRateInput
    private apiKey?: string

    constructor()

    constructor(
        source: ExchangeRateInput,
        apiKey?: string,
    )

    constructor(
        source: CurrencyCode,
        target: CurrencyCode,
        amount: number,
        apiKey?: string,
    )

    constructor(
        source?: ExchangeRateInput | CurrencyCode,
        target?: CurrencyCode | string,
        amount?: number,
        apiKey?: string,
    ) {
        if (typeof source === 'object' && source !== null) {
            this.config = {
                source: source.source,
                target: source.target,
                amount: source.amount,
            }

            this.apiKey = target
        } else {
            this.config = {
                source: source ?? 'USD',
                target: (target as CurrencyCode | undefined) ?? 'EUR',
                amount: amount ?? 1,
            }

            this.apiKey = apiKey
        }
    }

    source(value: CurrencyCode): this {
        this.config.source = value

        return this
    }

    target(value: CurrencyCode): this {
        this.config.target = value

        return this
    }

    amount(value: number): this {
        this.config.amount = value

        return this
    }

    async convert(): Promise<number> {
        const data = await this.request()

        return data.conversion_result
    }

    async rate(): Promise<number> {
        const data = await this.request()

        return data.conversion_rate
    }

    /**
     * Resolve this provider's API key.
     *
     * An explicitly supplied key takes precedence over environment
     * configuration.
     */
    private async resolveApiKey(): Promise<string> {
        await loadEnv()

        const key =
            this.apiKey ??
            process.env.EXCHANGERATE_API_KEY ??
            process.env.VITE_EXCHANGERATE_API_KEY ??
            process.env.NEXT_EXCHANGERATE_API_KEY ??
            ''

        if (!key) {
            throw new ExchangeException('missing-key', this)
        }

        return key
    }

    /**
     * Perform the provider-specific request.
     */
    private async request(): Promise<{
        conversion_rate: number
        conversion_result: number
    }> {
        const apiKey = await this.resolveApiKey()

        const {
            source,
            target,
            amount,
        } = this.config

        const baseUrl =
            `https://v6.exchangerate-api.com/v6/${apiKey}`

        try {
            const result = await fetch(
                `${baseUrl}/pair/${source}/${target}/${amount}`,
            )

            const data = await result.json()

            if (data.result === 'success') {
                return {
                    conversion_rate: data.conversion_rate,
                    conversion_result: data.conversion_result,
                }
            }

            throw new ExchangeException(
                data['error-type'] ||
                'An error occurred while fetching exchange rate',
                this
            )
        } catch (error) {
            if (error instanceof ExchangeException) {
                throw error
            }

            throw new ExchangeException(error as never, this)
        }
    }
}