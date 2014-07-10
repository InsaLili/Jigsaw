var app = require('http').createServer(handler), 
    io = require('socket.io').listen(app), 
    fs = require('fs'),
    cpt = 0;

app.listen(1337);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
    console.log("connected");
    socket.emit('news', { hello: cpt });
    cpt++;
    socket.on('my other event', function (data) {
        console.log(data);
    });
    socket.on('passUp', function (data) {
        socket.broadcast.emit('passUp',data);
    });
    socket.on('passRight', function (data) {
        socket.broadcast.emit('passRight',data);
    });
    socket.on('ray', function (data) {
        socket.broadcast.emit('ray',data);
    });
    socket.on('clean', function (data) {
        socket.broadcast.emit('clean',data); 
    });
    socket.on('disconnect', function() {
        cpt--;
    });
});
