import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  keyframes: {
			glow: {
			  '0%': { filter: 'drop-shadow(0 0 5px red)' },
			  '50%': { filter: 'drop-shadow(0 0 20px red)' },
			  '100%': { filter: 'drop-shadow(0 0 5px red)' },
			},
			rotate: {
			  '0%': { transform: 'rotate(0deg)' },
			  '50%': { transform: 'rotate(45deg)' },
			  '100%': { transform: 'rotate(90deg)' },
			},
		  },
		  animation: {
			glow: 'glow 1.5s infinite ease-in-out',
			rotate: 'rotate 2s infinite linear', // Rotation animation
			glowRotate: 'glow 1.5s infinite ease-in-out, rotate 2s infinite linear', // Combined glow and rotate
		  },
		
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
