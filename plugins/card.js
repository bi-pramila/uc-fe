const plugin = require('tailwindcss/plugin');

const cardPlugin = plugin(function ({ addComponents }) {
    addComponents({
        '.card': {
            '@apply shadow-md rounded-md shadow-slate-200 border-0 mb-5 border-transparent bg-white dark:bg-zinc-700 dark:shadow-zinc-500/20 group-data-[skin=bordered]:shadow-sm group-data-[skin=bordered]:border group-data-[skin=bordered]:border-slate-200 group-data-[skin=bordered]:shadow-lg group-data-[skin=bordered]:!shadow-slate-100 group-data-[skin=bordered]:dark:!shadow-zinc-500/30 group-data-[skin=bordered]:border group-data-[skin=bordered]:dark:border-zinc-500': {},

            '.card-body': {
                '@apply p-5': {},
            }
        },
    })
});

module.exports = cardPlugin;