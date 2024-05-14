import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,ts,tsx}'],
	theme: {
		container: {
			center: true,
			screens: {
				xs: '100%',
				sm: '592px',
				md: '768px',
				lg: '1024px',
				xl: '1440px',
			},
			padding: {
				DEFAULT: '1rem',
				xs: '1rem',
				sm: '1.5rem',
				md: '0.5rem',
				lg: '2rem',
				xl: '5rem',
			}
		},
		extend: {
			fontFamily: {
				regular: ['DodoRounded v2', ...defaultTheme.fontFamily.sans],
			},

            colors: {
                orange: {
                    DEFAULT: 'hsl(26,100%,50%)',
                },
                neutral: {
                    DEFAULT: 'hsl(0,0%,11%)',
                },
                red: {
                    DEFAULT: 'hsl(15,99%,47%)',
                }
            }
		}
	},
	plugins: [],
}
