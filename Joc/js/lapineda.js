

//---CONTENIDOR INFORMACIÓ DEL JOC---//

// --> Variables
    nomJugador = "";
    claus = -1;
    temps = 301; // 301= 5:01 minuts

// --> Funcions

    function restarTemps() {

        temps--;
        var minuts = Math.floor(temps / 60);
        var segons = temps - minuts * 60;

        // Si el segon és 0, perquè no es vegi així (5:0), li afegeixo un 0 extra (5:00)
        var extra = "";
        if (segons <= 9){
            
            extra = "0";
        }
        
        document.getElementById("temps").innerHTML = "<u>Temps Restant</u><br>"+minuts+":"+extra+segons; 

        
        if (temps == 0) {

            // MOSTREM LA IMATGE DEL RESULTAT
            var resposta = document.createElement("img");
            resposta.setAttribute("src", "img/game_over.jpg");
            resposta.setAttribute("width", "70%");
            resposta.setAttribute("height", "670");
            resposta.setAttribute("alt", "Game Over");
            resposta.style.position = "fixed";
            resposta.style.zIndex = "5";
            resposta.style.top = "25%";
            resposta.style.margin = "0px 0px 0px 200px";
            document.body.appendChild(resposta);

            // PAREM EL TEMPS
            clearInterval(intervalTemps);

            // PAREM EL JOC, PER LO QUE EL JUGADOR NO ES PODRÀ MOURE
            game.destroy();

            // I AL CAP DE 5 SEGONS, CANVIEM LA PÀGINA PER LA D'INICI
            setTimeout(function(){
                window.open("index.html", "_self"); 
            }, 5000);
        }
    }
    var intervalTemps = setInterval(restarTemps,1000);



    function sumarClaus() {

        claus++;
        document.getElementById("claus").innerHTML = "<u>Claus</u><br>"+claus+"/5"; 

        
        if (claus == 5) {

            // MOSTREM LA IMATGE DEL RESULTAT
            var resposta = document.createElement("img");
            resposta.setAttribute("src", "img/win.jpg");
            resposta.setAttribute("width", "70%");
            resposta.setAttribute("height", "670");
            resposta.setAttribute("alt", "Game Over");
            resposta.style.position = "fixed";
            resposta.style.zIndex = "5";
            resposta.style.top = "25%";
            resposta.style.margin = "0px 0px 0px 200px";
            document.body.appendChild(resposta);
            
            // PAREM EL JOC, PER LO QUE EL JUGADOR NO ES PODRÀ MOURE
            game.destroy()

            // I AL CAP DE 5 SEGONS, CANVIEM LA PÀGINA PER LA D'INICI
            setTimeout(function(){
                window.open("index.html", "_self"); 
            }, 5000);
        }
    }



    function nom(){

        var url = window.location.search;
        //console.log(url);

        nomJugador = url.split('=');
        nomJugador = nomJugador[1];
        nomJugador = decodeURI(nomJugador);
        //console.log(nomJugador);
        
        document.getElementById("nomJugador").innerHTML = "<u>Nom Jugador</u><br>"+nomJugador; 
    }



// Un cop la pàgina s'hagi carregat del tot
window.onload=function (){

    // NOM JUGADOR
    nom();

    // CLAUS
    sumarClaus();
};