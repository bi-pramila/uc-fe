const plugin = require('tailwindcss/plugin');

const prismjsPlugin = plugin(function ({ addComponents }) {
    addComponents({
        '.prism-code': {
            '@apply dark:bg-zinc-500': {},
        },
    })
});

module.exports = prismjsPlugin;