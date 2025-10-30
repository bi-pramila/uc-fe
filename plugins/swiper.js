const plugin = require('tailwindcss/plugin');

const swiperPlugin = plugin(function ({ addComponents, theme }) {
    addComponents({
        '.swiper-pagination-bullets': {
            '.swiper-pagination-bullet': {
                '@apply bg-fecustom-500 size-4 border-4 dark:border-zinc-900 outline outline-1 outline-fecustom-500': {},
            }
        },
    })
});

module.exports = swiperPlugin;