const plugin = require('tailwindcss/plugin');

const scrollHintPlugin = plugin(function ({ addComponents, theme }) {
    addComponents({
        '.scroll-hint-icon': {
            '@apply bg-slate-400 dark:bg-zinc-400': {},
            height: '90px',
            
            '.scroll-hint-text': {
                '@apply text-xs text-white': {},
            }
        },
        
        // ':root': {
        //     '--plyr-color-main':    theme('colors.custom.500')
        // }
    })
});

module.exports = scrollHintPlugin;