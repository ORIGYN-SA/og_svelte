const config = {
  content: ['./frontend/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['night'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};

module.exports = config;
