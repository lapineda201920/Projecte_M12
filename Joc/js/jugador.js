   
class Jugador {

  constructor(nom, temps, claus, posicioX, posicioY, clauSamuel, clauOlga, clauXavier, clauSergi, clauAlicia) {

    this.nom = nom;
    this.temps = temps;
    this.claus = claus;
    this.posicioX = posicioX;
    this.posicioY = posicioY;
    this.clauSamuel = clauSamuel;
    this.clauOlga = clauOlga;
    this.clauXavier = clauXavier;
    this.clauSergi = clauSergi;
    this.clauAlicia = clauAlicia;
  }


  guardarPartida(variable) {

    alert("Partida guardada!");

    // GUARDEM LA PARTIDA EN UNA VARIABLE
    var myobj = { 
      Nom: this.nom, 
      Temps: this.temps,
      Claus: this.claus,
      X: this.posicioX,
      Y: this.posicioY,
      ClauSamuel: this.clauSamuel,
      ClauOlga: this.clauOlga,
      ClauXavier: this.clauXavier,
      ClauSergi: this.clauSergi,
      ClauAlicia: this.clauAlicia 
    };

    // LA GUARDEM A MONGODB
    
    // --> SI LO QUE PASSEM PER GET ÉS LA ID DE LA PARTIDA, FEM UN UPDATE DE LA PARTIDA
    if (variable[0] == "?id"){

      socket.emit('actualitzarPartidaAMongoDB', {obj:myobj, id:variable[1]});
    }
    // --> SINÒ, CREA UNA PARTTIDA NOVA
    else{

      socket.emit('guardarPartidaAMongoDB', myobj);
    }
    

    
    
    // PAREM EL JOC, PER LO QUE EL JUGADOR NO ES PODRÀ MOURE
    game.destroy();

    location.href = "http://localhost:8080/index.html";
  }
}
