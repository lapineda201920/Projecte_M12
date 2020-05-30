
// VARIABLES SERVER
const http = require('http');
var url = require('url');
var fs = require('fs');

// SERVER
var server = http.createServer(function(req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.write(data);
    return res.end();
  });
});



// VARIABLES SOCKET.IO
var io = require('socket.io').listen(server);

// VARIABLES MONGODB
var MongoClient = require('mongodb').MongoClient;
var urlMongo = "mongodb://127.0.0.1:27017";

// SOCKET.IO
io.sockets.on('connection', function (socket) {

  console.log('--> Socket.io connectat!');
  socket.on('guardarPartidaAMongoDB', myobj => {

    MongoClient.connect(urlMongo, function(err, db) {

      if (err) throw err;
      var dbo = db.db("laPinedaAdventure");
      
      dbo.collection("jugadors").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("--> Partida Guardada!");
        db.close();
      });
    });
  });
});


server.listen(8080);