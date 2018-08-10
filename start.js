const nodemon = require('nodemon');
const path = require('path');

nodemon({
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'backend/server'),
  ignore: [],
  watch: process.env.NODE_ENV !== 'production' ? ['backend/*'] : false,
  ext: 'js'
})
.on('restart', function() {
  console.log('Server restarted!');
})
.once('exit', function () {
  console.log('Shutting down server');
  process.exit();
});
