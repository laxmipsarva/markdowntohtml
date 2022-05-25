const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const markdownToHtml = require('./controllers/markdown_to_html');
app.use('/', markdownToHtml);

module.exports = app.listen(4000, () => {
  console.info('App running on 4000');
})