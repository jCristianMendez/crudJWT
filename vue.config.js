module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/crud' : '/',
  transpileDependencies: [
    'vuetify'
  ]
}

