import { afterEach, describe, expect, it, vi } from 'vitest'

import { FrankfurterApi } from '../src/providers/exchage/FrankfurterApi'

describe('FrankfurterApi request', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('asks the v2 rate endpoint for the pair and multiplies the amount locally', async () => {
        const fetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response(JSON.stringify({ date: '2026-11-06', base: 'USD', quote: 'EUR', rate: 0.5 })),
        )

        const result = await new FrankfurterApi('USD', 'EUR', 100).convert()

        expect(fetch).toHaveBeenCalledWith('https://api.frankfurter.dev/v2/rate/USD/EUR')
        expect(result).toBe(50)
    })
})
