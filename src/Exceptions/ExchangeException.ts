type ExchangeErrorType =
    'missing-target' |
    'missing-source' |
    'missing-key' |
    'invalid-key' |
    'quota-reached' |
    'unsupported-code' |
    'malformed-request' |
    'inactive-account'

/**
 * Exchange Exception Class
 */
export class ExchangeException extends Error {
    public apiProvider = 'https://www.exchangerate-api.com'

    constructor(public type: ExchangeErrorType | Error) {
        let message = ''

        if (type instanceof ExchangeException) {
            message = type.message
            super(message)
            this.name = 'ExchangeException'
            this.type = type.type || 'unknown'

            return
        }

        switch (type) {
            case 'missing-key':
                message = 'Account is inactive, API Key is missing or the provided API Key is invalid. Please check and try again.'
                break
            case 'invalid-key':
                message = 'Account is inactive, API Key is missing or the provided API Key is invalid. Please check and try again.'
                break
            case 'inactive-account':
                message = 'Account is inactive, API Key is missing or the provided API Key is invalid. Please check and try again.'
                break
            case 'quota-reached':
                message = 'API request quota reached. Please upgrade your plan or wait until the quota resets.'
                break
            case 'unsupported-code':
                message = 'The provided currency code is not supported. Please check and try again.'
                break
            case 'malformed-request':
                message = 'The request was malformed. Please check the parameters and try again.'
                break
            case 'missing-source':
                message = 'Source currency not specified'
                break
            case 'missing-target':
                message = 'Target currency not specified'
                break
            default:
                message = typeof type === 'string' ? type : type.message
        }

        super(message)
        this.name = 'ExchangeException'
    }
}