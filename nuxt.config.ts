// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-mailer', "@nuxtjs/tailwindcss", '@pinia/nuxt'],
  css: [ './assets/main.css' ],

  runtimeConfig: {
    CONTRASENIA_ADMIN: process.env.CONTRASENIA_ADMIN,
    CORREO: process.env.CORREO,
    CONTRASENIA_CORREO: process.env.CONTRASENIA_CORREO,
    USUARIO: process.env.USUARIO,
    FRONTEND: process.env.FRONTEND,
    JWT_FIRMA: process.env.JWT_FIRMA
  }
})