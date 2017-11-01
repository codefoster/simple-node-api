let express = require('express');
let bodyParser = require('body-parser');
let http = require('http');

let app = express();

app.use(bodyParser.json());

let server = http.Server(app);

app.get('/api/route1', (req, res) => {
    res.json({ value: 'return something' });
});

//start the web server
let port = 3000;
server.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});