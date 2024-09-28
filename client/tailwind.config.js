// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#31363e', // Custom primary color
        todo: '#c432e9',
        working: '#64d4e7',
        completed: '#6cbe65',
        manage: '#25206b',
        timerBg: '#25206b',
        timerStart: '#065a22',
        timerStop: '#601414',
        timerSave: '#11aca2',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'], // Adding the Space Mono font
      },
      boxShadow: {
        'custom': '0 4px 15px rgba(0, 0, 0, 0.2)',
      },
      height: {
        'custom-500': '500px',
        'custom-400': '400px',
      },
      minHeight: {
        'custom-150': '150px',
      },
    },
  },
  plugins: [],
}
