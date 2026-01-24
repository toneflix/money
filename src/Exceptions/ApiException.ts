export class ApiException extends Error {
    constructor(message: string, private error: Error | null = null) {
        super(message)
        this.name = 'ApiException'
    }
}