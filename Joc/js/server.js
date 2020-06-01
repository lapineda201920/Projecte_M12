
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
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var urlMongo = "mongodb://127.0.0.1:27017";

// SOCKET.IO
io.sockets.on('connection', function (socket) {

  console.log('----- SOCKET.IO CONNECTAT -----');

  // PER A GUARDAR LES PARTIDES
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

  // PER A VEURE LES PARTIDES GUARDADES
  socket.on('obrirPartidesGuardades', res => {

    console.log(res);

    MongoClient.connect(urlMongo, function(err, db) {
      if (err) throw err;
      var dbo = db.db("laPinedaAdventure");
      
      dbo.collection("jugadors").find({}).toArray(function(err, result) {
        if (err) throw err;
        socket.emit('partidesGuardades', result);
        db.close();
      });
    });
  });

  // PER A VEURE LA INFORMACIÓ D'UNA PARTIDA EN CONCRET
  socket.on('obrirPartidaGuardada', idPartida => {

    MongoClient.connect(urlMongo, function(err, db) {
      if (err) throw err;
      var dbo = db.db("laPinedaAdventure");
      
      var o_id = mongo.ObjectID(idPartida);
      dbo.collection("jugadors").find({"_id": o_id}).toArray(function(err, result) {
        if (err) throw err;
        socket.emit('partidaGuardada', result);
        db.close();
      });
    });
  });

  // PER ACTUALITZAR UNA PARTIDA EN CONCRET
  socket.on('actualitzarPartidaAMongoDB', ({id, obj}) => {

    MongoClient.connect(urlMongo, function(err, db) {

      if (err) throw err;
      var dbo = db.db("laPinedaAdventure");
      
      var o_id = mongo.ObjectID(id);
      var set = {"$set" : obj};

      dbo.collection("jugadors").updateOne({ "_id": o_id }, set, function(err, res) {
        if (err) throw err;
        console.log("--> Partida Actualitzada!");
        db.close();
      });
    });
  });
});


server.listen(8080);