const plugin = require('tailwindcss/plugin');

const sweetAlert2Plugin = plugin(function ({ addComponents }) {
    addComponents({
        '.swal2-container': {
            '.swal2-title': {
                '@apply p-6 pb-0 text-xl font-semibold': {},
            },
        },
        '.swal2-popup': {
            '@apply pb-6 rounded-md bg-white text-body dark:bg-zinc-600 dark:text-white':{},

        },
        '.swal2-footer': {
            '@apply text-body border-t border-slate-200 dark:text-white dark:border-zinc-500':{},
        },
        '.swal2-html-container': {
            '@apply text-lg dark:text-zinc-50':{},
        },
        '.swal2-icon.swal2-question': {
            '@apply border-sky-500 text-sky-500':{},
        },
        '.swal2-icon.swal2-success': {
            '[class^=swal2-success-line]': {
                '@apply bg-green-500':{},
            },
            '.swal2-success-ring': {
                '@apply border-green-200':{},
            }
        },
        '.swal2-icon.swal2-warning': {
            '@apply border-yellow-500 text-yellow-500':{},
        },
        '.swal2-styled:focus': {
            '@apply shadow-none':{},
        },
        '.swal2-loader': {
            '@apply border-y-fecustom-500 border-x-transparent':{},
        },
        '.swal2-timer-progress-bar': {
            '@apply border-green-200':{},
        },
        '.swal2-progress-steps': {
            '.swal2-progress-step': {
                '@apply bg-fecustom-500':{},
            },
            '.swal2-progress-step.swal2-active-progress-step': {
                '@apply bg-fecustom-500':{},
            },
            '.swal2-progress-step.swal2-active-progress-step~.swal2-progress-step, .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line': {
                '@apply bg-fecustom-300':{},
            },
            '.swal2-progress-step-line': {
                '@apply bg-fecustom-500':{},
            }
        },
        ':is(.swal2-file, .swal2-input, .swal2-textarea)': {
            '@apply border border-slate-300':{},
            '&:focus': {
                '@apply shadow-none border-slate-400':{},
            }
        },
        '.swal2-close': {
            '@apply border border-slate-200 font-public font-light text-3xl transition ease-in-out dark:border-zinc-500  duration-300 hover:text-zinc-200 focus:shadow-none':{},
        },
        '.swal2-validation-message': {
            '@apply bg-transparent':{},
           
        }
    })
});

module.exports = sweetAlert2Plugin;