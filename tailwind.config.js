/**  @type {import('tailwindcss').Config}  */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      colors: {
        'primary': '#02274F',
        'secondary': '#FDCF00',
        'back': '#C4C4C4',
        'dark': '#262626',
        'backInput': '#F1F1F1',
        'blue': '#f2f8fb'
      },
      width: {
        'custom': '27.375rem',
        'customButtonWidth': '272px',
        'customWidth': '356px',
      },
      height: {
        'custom': '31.475rem',
        'customButtonHeight': '5%',
        'customHeight': '315px'
      },
  }, },
  plugins: [],
}
