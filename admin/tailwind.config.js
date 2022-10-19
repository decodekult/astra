module.exports = {
	content: [
		'./assets/src/dashboard-app/**/*.{html,js}',
	],
	plugins: [
		require( '@tailwindcss/forms' ),
	],
	theme: {
		extend: {
			colors: {
				spectra: {
					DEFAULT: '#6104FF',
					hover: '#5300E0',
				},
				astra: {
					DEFAULT: '#046BD2',
					hover: '#045CB4',
				},
			},
			fontFamily: {
				inter: ['"Inter"', 'sans-serif'],
			},
			boxShadow: {
				'overlay-left': '-16px 0px 80px -24px rgba(0, 0, 0, 0.16)',
				'overlay-right': '16px 0px 80px -24px rgba(0, 0, 0, 0.16)',
				'hover': '0px 12px 24px -12px rgba(0, 0, 0, 0.12)',
				'overlay-light': '0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
				'overlay-modal': '0px 32px 64px -24px rgba(0, 0, 0, 0.24)',
			},
			borderColor: (theme) => ({
				...theme('colors'),
			}),
		},
	},
	variants: {
		extend: {},
	},
}
