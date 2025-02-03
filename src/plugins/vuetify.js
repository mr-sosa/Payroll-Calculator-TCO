/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.scss'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#2C5746',
          secondary: '#78B152',
          black: '#282828',
          green: '#3a9f53',
          white: '#ffffff'
        },
      },
    },
  },
  typography: {
    fontFamily: 'Montserrat', // Cambia 'Roboto' por la fuente que desees
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 480,
      md: 767,
      lg: 900,
      xl: 1400,
    },
  },
})
