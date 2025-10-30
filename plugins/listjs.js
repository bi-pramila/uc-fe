const plugin = require('tailwindcss/plugin');

const listjsPlugin = plugin(function ({ addComponents, theme }) {
    addComponents({
        '.listjs-pagination': {
            '@apply mb-0 justify-end gap-2': {},

            'li': {
                '.page': {
                    '@apply flex items-center justify-center size-8 border border-slate-200 dark:border-zinc-500 rounded-md': {},
                },

                '&.active': {
                    '.page': {
                        '@apply text-white bg-fecustom-500 border-fecustom-500': {},
                    }
                }
            }
        },

        '.pagination-wrap': {
            '@apply flex items-center select-none': {},
        }
    })
});

module.exports = listjsPlugin;