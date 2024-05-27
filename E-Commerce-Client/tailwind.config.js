/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: '#c70049',
        color1_light1: 'rgb(227,25,99)',
        color1_light2: 'rgba(199,0,73,0.8)',
        color2: '#fff',
        color3: 'rgb(45,45,45)',
        color4: 'transparent',
        color5: '#f2f2f2',
        color6: '#f7f7f7',
      }
    },
  },
  plugins: [],
}

