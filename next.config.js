const path = require('path');

module.exports = {
  images: {
    domains: ["images.unsplash.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
