import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: ['src/money.ts'],
    format: ['esm', 'cjs'],
    outDir: 'dist',
    dts: true,
    sourcemap: false,
    external: [
        'fs',
        'path',
        'os',
        'dotenv'
    ],
    clean: true
}) 