import helpers from './helpers'

/**
 * Simple .env file parser
 * Reads and parses .env file without external dependencies
 * Safe for both Node.js and browser environments
 */
export const loadEnv = async (filePath: string = '.env'): Promise<void> => {
    helpers.useSetEnvLoaded(false)

    // Check if we're in Node.js environment
    if (typeof process === 'undefined' || typeof process.versions === 'undefined' || !process.versions.node) {
        // Browser environment - skip silently
        return
    }

    try {
        // Check if EXCHANGERATE_API_KEY is already set
        const key = process.env.EXCHANGERATE_API_KEY ??
            process.env.VITE_EXCHANGERATE_API_KEY ??
            process.env.NEXT_EXCHANGERATE_API_KEY ?? ''

        if (key !== '') {
            return
        }

        // Dynamically import Node.js modules (only available in Node.js)
        const fs = await import('fs')
        const path = await import('path')

        const envPath = path.resolve(process.cwd(), filePath)

        // Check if .env file exists
        if (!fs.existsSync(envPath)) {
            return
        }

        const content = fs.readFileSync(envPath, 'utf-8')
        const lines = content.split('\n')

        for (const line of lines) {
            // Skip empty lines and comments
            const trimmed = line.trim()
            if (!trimmed || trimmed.startsWith('#')) {
                continue
            }

            // Parse KEY=VALUE format
            const match = trimmed.match(/^([^=]+)=(.*)$/)
            if (!match) {
                continue
            }

            const key = match[1].trim()
            let value = match[2].trim()

            // Remove surrounding quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith('\'') && value.endsWith('\''))) {
                value = value.slice(1, -1)
            }

            // Only set if not already in environment
            if (!process.env[key]) {
                process.env[key] = value
            }
        }

        helpers.useSetEnvLoaded(true)
    } catch (error) {
        // Silently fail in case of errors (file read issues, import failures, etc.)
        console.debug('Failed to load .env file:', error)
    }
}