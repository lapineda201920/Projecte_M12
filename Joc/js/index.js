

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


function obrirPartida(){

    // CRIDEM LA FUNCIÓ PERQUÈ ENS BUSQUI LES PARTIDES
    socket.emit('obrirPartidesGuardades', '--> Anem a buscar les partides guardades!');

    // REBEM LES PARTIDES
    socket.on('partidesGuardades', function (partides) {
        
        var registrePartida =   "<tr>" + 
                                    "<th>NOM</th>" +
                                    "<th>MINUTS RESTANTS</th>" +
                                    "<th>CLAUS</th>" +
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
                                    "<td>" + partides[i]["Nom"] + "</td>" +
                                    "<td>" + minuts+":"+extra+segons + "</td>" +
                                    "<td>" + partides[i]["Claus"] + "</td>" +
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