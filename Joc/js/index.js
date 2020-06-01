

function mostra(articleATapar, articleAMostrar) {

    var antic = document.getElementById(articleATapar);
    var nou = document.getElementById(articleAMostrar);
    
    if (nou.style.display == 'none') {

    nou.style.display = 'block';
    antic.style.display = 'none';
    }
    else {

    nou.style.display = 'none';
    antic.style.display = 'block';
    }

    // SI OBRE LES PARTIDES GUARDADES, OBRIM LA FUNCIÓ PER A CARREGAR-LES
    if(nou.style.display == "block" && articleAMostrar == "obrirPartida"){obrirPartida()};

    // SI TANCA LES PARTIDES GUARDADES, ELIMINEM ELS REGISTRES
    if(nou.style.display == "none" && articleAMostrar == "obrirPartida"){tancarPartida()};
}

function agafarNom(){

    var nom = document.getElementById('nomPersonatge').value;
    window.location.replace('lapineda.html?nom='+nom);
}

function recuperarPartida(idPartida){

    // CRIDEM LA FUNCIÓ PERQUÈ ENS BUSQUI LA PARTIDA
    socket.emit('obrirPartidaGuardada', idPartida);

    // REBEM LA INFORMACIÓ DE LA PARTIDA
    socket.on('partidaGuardada', function (partida) {

        window.location.replace('lapineda.html?id='+partida[0]["_id"]);
    });
}

function eliminarPartida(idPartida){

    // CRIDEM LA FUNCIÓ PERQUÈ ENS ELIMINI LA PARTIDA
    socket.emit('eliminarPartidaGuardada', idPartida);

    // BORREM TOTES LES PARTIDES DEL HTML
    tancarPartida();

    // IMPRIMIM TOTES LES PARTIDES QUE ESTAN A LA BD AL HTML
    obrirPartida();
}

function obrirPartida(){

    // CRIDEM LA FUNCIÓ PERQUÈ ENS BUSQUI LES PARTIDES
    socket.emit('obrirPartidesGuardades', '--> Anem a buscar les partides guardades!');

    // REBEM LES PARTIDES
    socket.on('partidesGuardades', function (partides) {
        
        var registrePartida =   "<tr>" + 
                                    "<th>NOM</th>" +
                                    "<th>MINUTS RESTANTS</th>" +
                                    "<th>CLAUS</th>" +
                                    "<th>ESBORRAR</th>" +
                               "</tr>";
                               
        for (var i = 0; i < partides.length; i++){

            // CALCULEM EL TEMPS EN MINUTS I SEGONS
            var minuts = Math.floor(partides[i]["Temps"] / 60);
            var segons = partides[i]["Temps"] - minuts * 60;

            // Si el segon és 0, perquè no es vegi així (5:0), li afegeixo un 0 extra (5:00)
            var extra = "";
            if (segons <= 9){
                
                extra = "0";
            }
    
            
            // HO GUARDEM DINS LA VARIABLE
            registrePartida +=  "<tr>" +
                                    "<td onclick='recuperarPartida(this.id)' id='" + partides[i]["_id"] + "'>" + partides[i]["Nom"] + "</td>" +
                                    "<td onclick='recuperarPartida(this.id)' id='" + partides[i]["_id"] + "'>" + minuts+":"+extra+segons + "</td>" +
                                    "<td onclick='recuperarPartida(this.id)' id='" + partides[i]["_id"] + "'>" + partides[i]["Claus"] + "</td>" +
                                    "<td><button type='button' onclick='eliminarPartida(`" + partides[i]["_id"] + "`)'>Eliminar Partida!</button></td>" +
                                "</tr>";
        }

        // IMPRIMIM LA VARIABLE
        var table = document.getElementsByTagName("table")[0];
        table.innerHTML = registrePartida;
    });
};

function tancarPartida(){
    
    var table = document.getElementsByTagName("table")[0];
    var child = table.lastChild;  
    while (child) { 
        table.removeChild(child); 
        child = table.lastChild; 
    } 
};