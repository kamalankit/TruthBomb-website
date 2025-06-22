import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Truth Bomb Light Theme Colors
				'soft-white': '#FAFAFA',
				'warm-gray': '#F5F5F5',
				'deep-black': '#0A0A0A',
				'slate-gray': '#3C3C43',
				'champagne-gold': '#D5AE70',
				'blush-rose': '#F6D4D4',
				'soft-lavender': '#E4DEFA',
				'pale-aqua': '#D9F5F2',
				'light-gray': '#F0F0F0',
			},
			fontFamily: {
				'display': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				'body': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
			},
			fontSize: {
				'xs': ['11px', { lineHeight: '16px' }],
				'sm': ['13px', { lineHeight: '18px' }],
				'base': ['14px', { lineHeight: '20px' }],
				'lg': ['16px', { lineHeight: '24px' }],
				'xl': ['18px', { lineHeight: '28px' }],
				'2xl': ['20px', { lineHeight: '28px' }],
				'3xl': ['24px', { lineHeight: '32px' }],
				'4xl': ['28px', { lineHeight: '36px' }],
				'5xl': ['32px', { lineHeight: '40px' }],
				'6xl': ['36px', { lineHeight: '44px' }],
				'7xl': ['42px', { lineHeight: '48px' }],
				'8xl': ['48px', { lineHeight: '56px' }],
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(135deg, #FAFAFA, #F5F5F5)',
				'cta-gradient': 'linear-gradient(135deg, #F6D4D4, #D5AE70)',
				'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,245,245,0.8))',
				'section-gradient': 'linear-gradient(135deg, #E4DEFA, #D9F5F2)',
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(15px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				gentleBounce: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' }
				}
			},
			backdropBlur: {
				xs: '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;