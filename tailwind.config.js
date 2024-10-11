/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			primary: '#2b72e3',
  			secondary: 'hsl(217, 80%, 5%)',
  			frost: '#f1f5f9'
  		},
  		fontFamily: {
  			logo: 'Kaushan Script, cursive',
  			main: 'Itim, cursive'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}