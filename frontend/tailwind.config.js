// tailwind.config.js
module.exports = {
    plugins: [
      require('tailwind-scrollbar'),
    ],
  }

  /** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  darkMode: "class", // ✅ Must be 'class'
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


  
  
// // tailwind.config.js
// module.exports = {
//     content: [
//         './node_modules/preline/preline.js',
//     ],
//     plugins: [
//         require('preline/plugin'),
//     ],
//   }