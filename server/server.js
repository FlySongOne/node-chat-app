const path = require('path'); // built in module, no need for npm install
const express = require('express');


const publicPath = path.join(__dirname, '../public'); //Path is /Users/kyungsong/projects/node-chat-app/public
const port = process.env.PORT || 3000;                                                      
var app = express();

app.use(express.static(publicPath));



app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app}