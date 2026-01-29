import { describe, expect, it, vi } from 'vitest'

import helpers from '../src/utils/helpers'
import { loadEnv } from '../src/utils/env'

describe('Helpers', () => {
    describe('loadEnv', () => {
        it('should load environment variables from .env file', async () => {
            const spy = vi.spyOn(helpers, 'useSetEnvLoaded').mockReturnValue()
            const hasKey = Boolean(process.env.EXCHANGERATE_API_KEY)

            await loadEnv('.env.example')

            if (!hasKey) {
                expect(process.env.EXCHANGERATE_API_KEY).toBe('0xxxxxxxxxx')
                expect(spy).toHaveBeenCalledTimes(2)
            } else {
                expect(spy).toHaveBeenCalledTimes(1)
            }

            spy.mockRestore()
        })
    })
})