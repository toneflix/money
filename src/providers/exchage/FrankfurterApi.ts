import {
    CurrencyCode,
    ExchangeRateContract,
    ExchangeRateInput,
} from '../../types'

import { ExchangeException } from '../../Exceptions/ExchangeException'

/**
 * https://frankfurter.dev Exchange rates and currency data API Provider
 */
export class FrankfurterApi implements ExchangeRateContract {
    private config: ExchangeRateInput

    constructor()

    constructor(
        source: ExchangeRateInput,
    )

    constructor(
        source: CurrencyCode,
        target: CurrencyCode,
        amount: number,
    )

    constructor(
        source?: ExchangeRateInput | CurrencyCode,
        target?: CurrencyCode | string,
        amount?: number,
    ) {
        if (typeof source === 'object' && source !== null) {
            this.config = {
                source: source.source,
                target: source.target,
                amount: source.amount,
            }
        } else {
            this.config = {
                source: source ?? 'USD',
                target: (target as CurrencyCode | undefined) ?? 'EUR',
                amount: amount ?? 1,
            }
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
     * Perform the provider-specific request.
     */
    private async request(): Promise<{
        conversion_rate: number
        conversion_result: number
    }> {
        const {
            source,
            target,
            amount,
        } = this.config

        const baseUrl = 'https://api.frankfurter.dev/v2'

        try {
            const result = await fetch(
                `${baseUrl}/rate/${source}/${target}/${amount}`,
            )

            const data = await result.json()
            if (typeof data.rate === 'number' && Number.isFinite(data.rate)) {
                return {
                    conversion_rate: data.rate,
                    conversion_result: data.rate * this.config.amount,
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