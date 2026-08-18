import {
    CurrencyCode,
    ExchangeRateInput,
    ExchangeRateProvider,
} from './types'

import { ExchangeException } from './Exceptions/ExchangeException'
import { ExchangeRateApi } from './providers/exchage/ExchangeRateApi'
import { Money } from './money'
import { loadEnv } from './utils/env'

export class Exchange {
    /**
     * Legacy globally configured API key.
     *
     * Kept for backwards compatibility with {@link setApiKey}('...')
     * 
     * @deprecated use {@link setProvider} instead
     */
    private static apiKey?: string

    /**
     * Provider used to perform currency conversions.
     *
     * {@link ExchangeRateApi} remains the default provider so existing users do not
     * need to explicitly configure a provider.
     */
    private static provider: ExchangeRateProvider = ExchangeRateApi

    result: number | string = 0

    /**
     * Deferred operation executed when the Exchange instance is awaited.
     */
    caller: () => Promise<number> = async () => 0

    constructor(
        private source?: CurrencyCode,
        private target?: CurrencyCode,
        private amount: number = 1,
    ) { }

    /**
     * Set the API key globally.
     *
     * This method is intentionally preserved for backwards compatibility.
     * The key is passed to the selected exchange-rate provider.
     *
     * @param key API key used by providers that require authentication.
     */
    static setApiKey(key: string): void {
        Exchange.apiKey = key
    }

    /**
     * Set the provider used for exchange-rate requests.
     *
     * @param provider Exchange-rate provider constructor.
     */
    static setProvider(provider: ExchangeRateProvider): void {
        Exchange.provider = provider
    }

    /**
     * Reset global Exchange configuration to its defaults.
     *
     * Primarily useful for testing or applications that need to
     * reinitialize exchange configuration.
     */
    static reset(): void {
        Exchange.apiKey = undefined
        Exchange.provider = ExchangeRateApi
    }

    /**
     * Convert an amount from one currency to another.
     *
     * The actual conversion is deferred until the Exchange instance is
     * awaited, formatted, or its promise methods are used.
     *
     * @param amount Amount to convert.
     * @param source Optional source currency.
     * @param target Optional target currency.
     */
    convert(
        amount: number,
        source?: CurrencyCode,
        target?: CurrencyCode,
    ): this {
        if (!source && !this.source) {
            throw new ExchangeException('missing-source')
        }

        if (!target && !this.target) {
            throw new ExchangeException('missing-target')
        }

        this.source = source ?? this.source
        this.target = target ?? this.target
        this.amount = amount

        this.caller = () => this.send(false)

        return this
    }

    /**
     * Retrieve the exchange rate between two currencies.
     *
     * @param source Optional source currency.
     * @param target Optional target currency.
     */
    rate(
        source?: CurrencyCode,
        target?: CurrencyCode,
    ): this {
        if (!source && !this.source) {
            throw new ExchangeException('missing-source')
        }

        if (!target && !this.target) {
            throw new ExchangeException('missing-target')
        }

        this.source = source ?? this.source
        this.target = target ?? this.target

        this.caller = () => this.send(true)

        return this
    }

    /**
     * Set the source currency.
     *
     * @param source Source currency.
     */
    from(source: CurrencyCode): this {
        this.source = source

        return this
    }

    /**
     * Set the target currency.
     *
     * @param target Target currency.
     */
    to(target: CurrencyCode): this {
        this.target = target

        return this
    }

    /**
     * Create an Exchange instance with a source currency.
     *
     * Allows:
     *
     * Exchange.from('USD').to('EUR').convert(100)
     */
    static from(source: CurrencyCode): Exchange {
        return new Exchange().from(source)
    }

    /**
     * Create an Exchange instance with a target currency.
     */
    static to(target: CurrencyCode): Exchange {
        return new Exchange().to(target)
    }

    /**
     * Execute the current conversion and format the resulting amount.
     */
    async format(): Promise<string> {
        const result = await this.caller()

        return new Money(result, this.target).format()
    }

    /**
     * Convert and format an amount in one operation.
     */
    static async format(
        amount: number,
        source: CurrencyCode,
        target: CurrencyCode,
    ): Promise<string> {
        return new Exchange(source, target)
            .convert(amount)
            .format()
    }

    /**
     * Execute the configured operation using the selected provider.
     *
     * Exchange itself does not know anything about HTTP endpoints or provider
     * response formats. Those responsibilities belong to the provider.
     *
     * The globally configured API key is forwarded to the provider to preserve
     * compatibility with Exchange.setApiKey().
     *
     * @param getRate When true, return the exchange rate instead of converting.
     */
    private async send(getRate = false): Promise<number> {
        if (!this.source) {
            throw new ExchangeException('missing-source')
        }

        if (!this.target) {
            throw new ExchangeException('missing-target')
        }

        /**
         * Preserve the previous environment-variable behavior.
         *
         * This allows all of these to continue working:
         *
         * Exchange.setApiKey('...')
         * EXCHANGERATE_API_KEY=...
         * VITE_EXCHANGERATE_API_KEY=...
         * NEXT_EXCHANGERATE_API_KEY=...
         */
        await loadEnv()

        const apiKey =
            Exchange.apiKey ??
            process.env.EXCHANGERATE_API_KEY ??
            process.env.VITE_EXCHANGERATE_API_KEY ??
            process.env.NEXT_EXCHANGERATE_API_KEY

        const config: ExchangeRateInput = {
            source: this.source,
            target: this.target,
            amount: this.amount,
        }

        /**
         * Instantiate the configured provider.
         *
         * Providers that do not require an API key can simply ignore the
         * second constructor argument.
         */
        const provider = new Exchange.provider(config, apiKey)

        return getRate
            ? provider.rate()
            : provider.convert()
    }

    /**
     * Makes Exchange thenable.
     *
     * This allows an Exchange chain to be awaited directly:
     *
     * const result = await Exchange
     *     .from('USD')
     *     .to('EUR')
     *     .convert(100)
     */
    then<T>(
        onFulfilled?: (value: number) => T | PromiseLike<T>,
        onRejected?: (reason: unknown) => T | PromiseLike<T>,
    ): Promise<T> {
        return this.caller().then(onFulfilled, onRejected)
    }

    /**
     * Catch errors from the deferred exchange operation.
     */
    catch<T>(
        onRejected?: (reason: unknown) => T | PromiseLike<T>,
    ): Promise<number | T> {
        return this.caller().catch(onRejected)
    }

    /**
     * Run a callback after the deferred exchange operation completes.
     */
    finally(
        onFinally?: (() => void) | null,
    ): Promise<number> {
        return this.caller().finally(onFinally)
    }
}