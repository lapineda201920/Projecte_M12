

//---CONTENIDOR INFORMACIÓ DEL JOC---//

// --> Variables
    nomJugador = "";
    claus = -1;
    temps = 301; // = 5:01 minuts

// --> Funcions

    function restarTemps() {

        temps--;
        var minuts = Math.floor(temps / 60);
        var segons = temps - minuts * 60;

        // Si el segon és 0, perquè no es vegi així (5:0), li afegeixo un 0 extra (5:00)
        var extra = "";
        if (segons == 0){
            
            extra = "0";
        }
        
        document.getElementById("temps").innerHTML = "<u>Temps Restant</u><br>"+minuts+":"+segons+extra; 

        
        if (temps == 0) {

            alert("Game Over!");
            clearInterval(intervalTemps);
        }
    }
    var intervalTemps = setInterval(restarTemps,1000);



    function sumarClaus() {

        claus++;
        document.getElementById("claus").innerHTML = "<u>Claus</u><br>"+claus+"/5"; 

        
        if (claus == 5) {

            alert("Has Guanyat!")
        }
    }



    function nom(){

        var url = window.location.search;
        console.log(url);

        nomJugador = url.split('=');
        nomJugador = nomJugador[1];
        nomJugador = decodeURI(nomJugador);
        console.log(nomJugador);
        
        document.getElementById("nomJugador").innerHTML = "<u>Nom Jugador</u><br>"+nomJugador; 
    }



// Un cop la pàgina s'hagi carregat del tot
window.onload=function (){

    // NOM JUGADOR
    nom();

    // CLAUS
    sumarClaus();
};