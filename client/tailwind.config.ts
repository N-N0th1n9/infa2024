import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        mainRed: '#E75B62',
        primaryRed: '#e37479',

        mainWhite: '#FCE1E2',
      },
      boxShadow: {
        mainShadow: '0px 0px 20px -5px rgba(0,0,0,0.4)',
      },
    },
  },
}
export default config
