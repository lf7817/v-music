/* eslint-disable no-undef */
module.exports = {
  baseUrl: './',
  devServer: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
}