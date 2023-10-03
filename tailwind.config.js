/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C11B89",
        secondary: "#B7648C", 
        postitive: "#ffffff",
        negative: "#000000",
        light_bg : '#F5F6F6',
        light_bg_chat : '#EAEAEA'


      },
      fontSize: {
        biggest: ' 24px',
        bigger: ' 18px',
        big: '18px',
        md: '16px',
        small: '14px',
        vsmall: "12px"
      } 
    },
  },
  plugins: [],
}
