

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
}

function agafarNom(){

    var nom = document.getElementById('nomPersonatge').value;
    window.location.replace('lapineda.html?nom='+nom);
}