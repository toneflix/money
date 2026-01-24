import { existsSync, readFileSync } from 'fs'

import { resolve } from 'path'

/**
 * Simple .env file parser
 * Reads and parses .env file without external dependencies
 */
export function loadEnv (filePath: string = '.env'): void {
    const envPath = resolve(process.cwd(), filePath)

    // Check if .env file exists or process.env.EXCHANGERATE_API_KEY is already set
    if (!existsSync(envPath) || process.env.EXCHANGERATE_API_KEY) {
        return
    }

    try {
        const content = readFileSync(envPath, 'utf-8')
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
    } catch {
        // Silently fail if .env file cannot be read
        // This maintains backwards compatibility
    }
}
