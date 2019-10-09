const express = require('express');
const app = express();

app.use(express.static(__dirname+'/dist/algamoney-ui'));

app.get('/*', function(req, resp){
  resp.sendfile(__dirname+'/index.html');
});

app.listen(process.env.PORT || 4200);
