import { defineConfig } from 'tsdown'

export default defineConfig([
    {
        entry: { index: 'src/index.ts', types: 'src/types.ts' },
        format: ['esm', 'cjs'],
        outDir: 'dist',
        dts: true,
        sourcemap: false,
        minify: true,
        treeshake: true,
        exports: true,
        clean: true,
        outputOptions: {
            legalComments: 'inline'
        },
        env: {
            EXCHANGERATE_API_KEY: process.env.EXCHANGERATE_API_KEY ?? ''
        }
    }
]) 