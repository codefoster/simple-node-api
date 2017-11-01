let express = require('express');
let socketio = require('socket.io');
let bodyParser = require('body-parser');
let http = require('http');

let app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setup socket.io
let server = http.Server(app);
let socketServer = socketio.listen(server);

socketServer.on("connection", function (socket) {
    console.log(`socket connection establish (${socket.conn.id})`);
    socket.on("message", d => {
        if (d.message == 'mymessage') {
            //do stuff in response to mymessage
            //maybe send a socket message using socketServer.send({ message: 'mymessage' });
        }
        else {
            //pass other messages on to all connected socket clients
            socketServer.send(d);
        }
    });
});

app.use('/', express.static(__dirname + '/public'));

app.get('/api/route1', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json({value:'return something'});
});

app.post('/api/route1', (req, res) => {
    //do stuff
    //maybe send a socket message using socketServer.send({ message: 'mymessage' });
    res.json({value:'return something'});
});

//start the web server
let port = 3000;
server.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});