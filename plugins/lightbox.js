const plugin = require('tailwindcss/plugin');

const lightboxPlugin = plugin(function ({ addComponents }) {
    addComponents({
        '.glightbox-clean ': {
           '.gslide-description': {
                '@apply bg-white dark:bg-zinc-600': {},
            },

            '.gslide-title': {
                '@apply text-slate-800 dark:text-zinc-50 mb-4': {},
            },
        }
    })
});

module.exports = lightboxPlugin;