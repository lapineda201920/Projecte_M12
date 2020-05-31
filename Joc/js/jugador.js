   
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


  guardarPartida(socket) {

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
    
    socket.emit('guardarPartidaAMongoDB', myobj);

    
    
    // PAREM EL JOC, PER LO QUE EL JUGADOR NO ES PODRÀ MOURE
    game.destroy();

    location.href = "http://localhost:8080/index.html";

    /*console.log("Nom: " + this.nom + "\nTemps: " + this.temps + 
                "\nClau: " + this.claus + "\nX: " +  this.posicioX + 
                "\nY: " + this.posicioY + "\nCSamuel: " + this.clauSamuel + 
                "\nCOlga: " + this.clauOlga + "\nCXavier: " + this.clauXavier + 
                "\nCSergi: " + this.clauSergi + "\nCAlicia: " + this.clauAlicia);*/
  }
}
