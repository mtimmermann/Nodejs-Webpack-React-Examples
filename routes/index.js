const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Boilerplate Webpack React Node.js' });
// });

//* GET /example */
router.get('/example', function(req, res, next) {
  res.render('example', { title: 'Example Pug template' });
});

module.exports = router;
