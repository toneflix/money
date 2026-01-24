import { defineConfig } from 'vitepress'

export default defineConfig({
    title: '@toneflix/money',
    description: 'A simple and efficient money and currency conversion and formatting tool for JavaScript and TypeScript projects.',

    base: '/money/',

    head: [
        ['link', { rel: 'icon', href: '/money/banner.png' }],
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
        ['meta', { name: 'theme-color', content: '#fbb322' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/money/banner.png' }],
        ['link', { rel: 'mask-icon', href: '/money/banner.png', color: '#fbb322' }],
        ['meta', { name: 'msapplication-TileImage', content: '/money/banner.png' }],
        ['meta', { property: 'og:title', content: '@toneflix/money' }],
        ['meta', { property: 'og:description', content: 'A simple and efficient money and currency conversion and formatting tool for JavaScript and TypeScript projects.' }],
        ['meta', { property: 'og:image', content: '/money/banner.png' }],
        ['meta', { property: 'og:url', content: 'https://toneflix.github.io/money/' }],
        ['meta', { name: 'og:type', content: 'website' }],
        ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: '@toneflix/money' }],
        ['meta', { name: 'twitter:description', content: 'A simple and efficient money and currency conversion and formatting tool for JavaScript and TypeScript projects.' }],
        ['meta', { name: 'twitter:image', content: '/money/banner.png' }],
    ],

    themeConfig: {
        logo: '/banner.png',

        nav: [
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'API Reference', link: '/api/money' },
            { text: 'Examples', link: '/examples/formatting' },
        ],

        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    items: [
                        { text: 'Getting Started', link: '/guide/getting-started' },
                        { text: 'Installation', link: '/guide/installation' },
                        { text: 'Quick Start', link: '/guide/quick-start' },
                    ]
                },
                {
                    text: 'Core Concepts',
                    items: [
                        { text: 'Money Formatting', link: '/guide/money-formatting' },
                        { text: 'Currency Conversion', link: '/guide/currency-conversion' },
                        { text: 'Mathematical Operations', link: '/guide/math-operations' },
                    ]
                }
            ],
            '/api/': [
                {
                    text: 'API Reference',
                    items: [
                        { text: 'Money Class', link: '/api/money' },
                        { text: 'Exchange Class', link: '/api/exchange' },
                    ]
                }
            ],
            '/examples/': [
                {
                    text: 'Examples',
                    items: [
                        { text: 'Formatting', link: '/examples/formatting' },
                        { text: 'Conversion', link: '/examples/conversion' },
                        { text: 'Calculations', link: '/examples/calculations' },
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/toneflix/money' },
            { icon: 'npm', link: 'https://www.npmjs.com/package/@toneflix/money' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present ToneFlux'
        },

        search: {
            provider: 'local'
        }
    }
})
