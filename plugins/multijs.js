const plugin = require('tailwindcss/plugin');

const multijsPlugin = plugin(function ({ addComponents, theme }) {
    addComponents({
        '.multi-wrapper': {
            '@apply border-0': {},
        
            '.non-selected-wrapper': {
                '@apply border border-slate-200 bg-white rounded-tl-md rounded-bl-md dark:border-zinc-500 dark:bg-zinc-700': {},
            },

            '.selected-wrapper, .non-selected-wrapper': {
                '&::-webkit-scrollbar': {
                    webkitAppearance: 'none'
                },
                '&::-webkit-scrollbar:vertical': {
                    '@apply w-2.5': {},
                },
                '&::-webkit-scrollbar:horizontal' :{
                    '@apply h-2.5': {},
                },
                '&::-webkit-scrollbar-thumb': {
                    '@apply border-2 border-white bg-slate-100 dark:bg-zinc-600 dark:border-zinc-700 rounded-md': {},
                },
                '&::-webkit-scrollbar-track': {
                    '@apply bg-white rounded-md dark:bg-zinc-700': {},
                },
            },

            '.item-group .group-label': {
                '@apply text-xs': {},
            },

            '.item': {
                '@apply text-slate-700 dark:text-zinc-100 dark:hover:text-zinc-50 transition-all duration-200 ease-linear hover:bg-fecustom-500 hover:text-white': {},
            },

            '.selected-wrapper': {
                '@apply border border-slate-200 dark:border-zinc-500 bg-white dark:bg-zinc-700 rounded-tr-md rounded-br-md': {},
            },

            '.search-input': {
                flex: '0 0 auto',
                '@apply py-2 px-4 text-slate-700 dark:text-zinc-100 bg-white dark:bg-zinc-700 font-public text-base !border !border-solid !border-slate-200 dark:!border-zinc-500 rounded-md mb-4 placeholder-slate-400 dark:placeholder-zinc-300': {},
            },

            '.header': {
                '@apply font-semibold text-slate-700 dark:text-zinc-100': {},
            }
        },
    })
});

module.exports = multijsPlugin;