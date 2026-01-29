import { describe, expect, it, vi } from 'vitest'

import helpers from '../src/utils/helpers'
import { loadEnv } from '../src/utils/env'

describe('Helpers', () => {
    describe('loadEnv', () => {
        it('should load environment variables from .env file', async () => {
            const spy = vi.spyOn(helpers, 'useSetEnvLoaded').mockReturnValue()

            await loadEnv('.env.example')

            expect(spy).toHaveBeenCalledTimes(2)

            expect(process.env.EXCHANGERATE_API_KEY).toBe('0xxxxxxxxxx')

            spy.mockRestore()
        })
    })
})