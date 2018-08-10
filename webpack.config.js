switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./configs/webpack.prod');
    break;

  case 'dev':
  case 'development':
  default:
    module.exports = require('./configs/webpack.dev');
}
