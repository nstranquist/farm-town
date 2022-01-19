// Deploy next.js to gh-pages:
// https://dev.to/jameswallis/deploying-a-next-js-app-to-github-pages-24pn

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins(
  [optimizedImages, {
    mozjpeg: {
      quality: 80,
    },
    pngquant: {
      speed: 3,
      strip: true,
      verbose: true,
    },
    imagesPublicPath: '/nstranquist/_next/static/images/',
  }],
  {
    reactStrictMode: true,
    basePath: "/nstranquist/",
    assetPrefix: "/nstranquist/",
    env
})
