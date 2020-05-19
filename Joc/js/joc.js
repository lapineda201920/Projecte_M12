

// CONFIGURACIÓ DE COM S'EXECUTARÀ PHASER
const config = {
  type: Phaser.AUTO,
  width: 844,
  height: 470,
  parent: "contenidor", // --> CONTANIDOR ON S'IMPRIMIRÀ EL JOC
  pixelArt: true,
  scene: { // --> ORDRE DE CÀRREGA DE LES FUNCIONS
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // --> AL SER UN JOC EN VISTA D'OCELL, NO HI HA D'HAVER GRAVETAT, PER LO QUE POSSAREM 0
    }
  }
};



// DECLAREM EL JOC I LES VARIABLES
const game = new Phaser.Game(config);
let cursors;
let jugador;


var contador = 0;
var contadorAccertades = 0;
var hiParla = false;
var tempsResposta = null;
var respostaJugador = 0;

/*********ALUMNE************/
var xocaAlumne = false;

/**********SAMUEL***********/
var xocaSamuel, clauSamuel = false;

/**********OLGA***********/
var xocaOlga, clauOlga = false;

/**********XAVIER***********/
var xocaXavier, clauXavier = false;

/**********SERGI***********/
var xocaSergi, clauSergi = false;

/**********ALICIA***********/
var xocaAlicia, clauAlicia = false;

/*********CAFETERIA***********/
var xocaCafeteria = false;





function preload() {

  // 1.A - CARREGUEM EL MAPA I LA IMATGE D'ON TREIEM LES 'TILES'
  this.load.image("tiles", "img/tilesets/tileset-shinygold2.png");
  this.load.tilemapTiledJSON("map", "mapes/mapa_la_pineda.json");

  // 1.B - CARREGUEM LES IMATGES DEL JUGADOR
  this.load.atlas("ninoJugador", "img/jugador.png", "img/jugador.json");
}




function create() {

  // 2 - CREEM COM UN MAPA DE TILE EL MAPA PRÈVIAMENT CARREGAT
  const map = this.make.tilemap({ key: "map" });


  // 3 - AFEGIM LES IMATGES EN ELS 'TILES' CORRESPONENTS
  const tileset = map.addTilesetImage("tileset-shinygold2", "tiles");


  // 4 - INDIQUEM QUINES CAPES VOLEM QUE MOSTRI
  const terra = map.createStaticLayer("Capa terra", tileset, 0, 0);
  const arbres = map.createStaticLayer("Capa arbres", tileset, 0, 0);
  const superficies = map.createStaticLayer("Capa superficies", tileset, 0, 0);
  const persones = map.createStaticLayer("Capa persones", tileset, 0, 0);
  const samuel = map.createStaticLayer("Capa Samuel", tileset, 0, 0);
  const olga = map.createStaticLayer("Capa Olga", tileset, 0, 0);
  const xavier = map.createStaticLayer("Capa Xavier", tileset, 0, 0);
  const sergi = map.createStaticLayer("Capa Sergi", tileset, 0, 0);
  const alicia = map.createStaticLayer("Capa Alicia", tileset, 0, 0);
  const cafeteria = map.createStaticLayer("Capa Cafeteria", tileset, 0, 0);


  // 5 - LOCALITZEM EL LLOC ON FARÀ SPAWN EL JUGADOR
  const llocSpawn = map.findObject("Lloc Spawn", obj => obj.name === "Lloc Spawn");


  // 6 - LI AFEGIM FÍSICA AL JUGADOR (LLOC ON APAREIXARÀ-X, LLOC ON APAREIXARÀ-Y, "", "")
  jugador = this.physics.add.sprite(llocSpawn.x, llocSpawn.y, "ninoJugador", "jugador-esquerra.png").setSize(30, 30).setOffset(0, 10);

  this.physics.add.collider(jugador, arbres);
  this.physics.add.collider(jugador, superficies);
  this.physics.add.collider(jugador, persones, function(){ xocaAlumne = true;});
  this.physics.add.collider(jugador, samuel, function(){ xocaSamuel = true;});
  this.physics.add.collider(jugador, olga, function(){ xocaOlga = true;});
  this.physics.add.collider(jugador, xavier, function(){ xocaXavier = true;});
  this.physics.add.collider(jugador, sergi, function(){ xocaSergi = true;});
  this.physics.add.collider(jugador, alicia, function(){ xocaAlicia = true;});
  this.physics.add.collider(jugador, cafeteria, function(){ xocaCafeteria = true;});


  // 7 - LI DIEM QUINES CAPES VOLEM QUE S'EXECUTI EL 'COLLIDES'
  arbres.setCollisionByProperty({ collides: true });
  superficies.setCollisionByProperty({ collides: true });
  persones.setCollisionByProperty({ collides: true });
  samuel.setCollisionByProperty({ collides: true });
  olga.setCollisionByProperty({ collides: true });
  xavier.setCollisionByProperty({ collides: true });
  sergi.setCollisionByProperty({ collides: true });
  alicia.setCollisionByProperty({ collides: true });
  cafeteria.setCollisionByProperty({ collides: true });


  // 8 - CREEM ELS FRAMES AMB LES IMATGES CORRESPONENTS (PRÈVIAMENT CARREGADES AMB EL JSON)
  this.anims.create({
    key: "jugador-esquerra-caminar",
    frames: this.anims.generateFrameNames("ninoJugador", {
      prefix: "jugador-esquerra-caminar.",
      start: 0,
      end: 3,
      zeroPad: 3,
      suffix: ".png"
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "jugador-dreta-caminar",
    frames: this.anims.generateFrameNames("ninoJugador", {
      prefix: "jugador-dreta-caminar.",
      start: 0,
      end: 3,
      zeroPad: 3,
      suffix: ".png"
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "jugador-davant-caminar",
    frames: this.anims.generateFrameNames("ninoJugador", {
      prefix: "jugador-davant-caminar.",
      start: 0,
      end: 3,
      zeroPad: 3,
      suffix: ".png"
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "jugador-esquena-caminar",
    frames: this.anims.generateFrameNames("ninoJugador", {
      prefix: "jugador-esquena-caminar.",
      start: 0,
      end: 3,
      zeroPad: 3,
      suffix: ".png"
    }),
    frameRate: 10,
    repeat: -1
  });


  // 9 - LI INDIQUEM QUE ENS MOSTRI EL RESULTAT A PANTALLA
  const camera = this.cameras.main;
  camera.startFollow(jugador);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  cursors = this.input.keyboard.createCursorKeys();


  // 10 - ESCRIBIM TEXT A LA PANTALLA
  informacioMoure = this.add.text(15, 15, "Utilitza les fletxes per moure't, i la 'D' per parlar!", { font: "20px monospace", fill: "#ffffff", padding: { x: 20, y: 10 }, backgroundColor: "#000000"}).setScrollFactor(0);
  resposta = this.add.text(15, 15, "Persona: !", { font: "20px monospace", fill: "#000000", padding: { x: 20, y: 10 }, backgroundColor: "#ffffff"}).setScrollFactor(0).setVisible(false);
}







function update(time, delta) {


  const velocitat = 180;
  const velocitatPrevia = jugador.body.velocity.clone();

  // 11 - PAREM QUALSEVOL MOVIMENT ABANS DEL ÚLTIM FRAME
  jugador.body.setVelocity(0);


  // 12 - MOVIMENT HORITZONTAL
  if (cursors.left.isDown) { jugador.body.setVelocityX(-velocitat);}
  else if (cursors.right.isDown) { jugador.body.setVelocityX(velocitat);}


  // 13 - MOVIMENT VERTICAL
  if (cursors.up.isDown) { jugador.body.setVelocityY(-velocitat);}
  else if (cursors.down.isDown) { jugador.body.setVelocityY(velocitat);}


  // 14 - NORMALITZAR LA VELOCITAT PERQUÈ EL JUGADOR NO ES MOGUI MÉS DEPRESSA EN DIAGONAL
  jugador.body.velocity.normalize().scale(velocitat);


  // 15 - ACTUALITZEM L'ANIMACIÓ SI CAMINA ...
  if (cursors.left.isDown) { jugador.anims.play("jugador-esquerra-caminar", true);}
  else if (cursors.right.isDown) { jugador.anims.play("jugador-dreta-caminar", true);}
  else if (cursors.up.isDown) { jugador.anims.play("jugador-esquena-caminar", true);}
  else if (cursors.down.isDown) { jugador.anims.play("jugador-davant-caminar", true);}
  else{

    // 16 - SINÓ CAMINA, LA PAREM E POSSEM UNA IMATGE ON NO CAMINI
    jugador.anims.stop();

    if (velocitatPrevia.x < 0){ jugador.setTexture("ninoJugador", "jugador-esquerra.png");}
    else if (velocitatPrevia.x > 0){ jugador.setTexture("ninoJugador", "jugador-dreta.png");}
    else if (velocitatPrevia.y < 0) { jugador.setTexture("ninoJugador", "jugador-esquena.png");}
    else if (velocitatPrevia.y > 0) { jugador.setTexture("ninoJugador", "jugador-davant.png");}
  }


  
  if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown){

    this.input.keyboard.once("keydown_D", event => {

      informacioMoure.setVisible(true);
      resposta.setVisible(false);
      clearTimeout(tempsResposta);
      cursors = this.input.keyboard.createCursorKeys();
    });
  }

  // 17 - SI EL JUGADOR XOCA / ESTÀ AL COSTAT D'ALGUN --ALUMNE--
  if (xocaAlumne){

    xocaAlumne = false;
    // I SI PREM LA TECLA D
    this.input.keyboard.once("keydown_D", event => {

      informacioMoure.setVisible(false);
      
      var respostesAlumnes = [
        "Quina calor que fa", "Bon dia", "Aquesta pràctica és molt complicada", 
        "No trobo les ulleres", "Has vist al Samuel?", "Has vist a l'Olga?", 
        "Has vist al Marcel?", "CORONAVIRUS!", "Saps com sol·lucionar l'error de Dockers?",
        "Ja has fet la pràctica?", "Avui hi ha entrepà de pinxos?", "Ufff..."
      ];
      var numeroRespostaAleatoria = Math.floor((Math.random() * respostesAlumnes.length));
      resposta.text = "Alumne: "+respostesAlumnes[numeroRespostaAleatoria];

      resposta.setVisible(true);

      tempsResposta = setTimeout(function(){
        informacioMoure.setVisible(true);
        resposta.setVisible(false);
        },2000);
    });
  }


  // 18 - SI EL JUGADOR XOCA / ESTÀ AL COSTAT D'ALGUN --PROFESSOR--
  // --> SAMUEL <--//
  if (xocaSamuel){

    
    // PREGUNTES QUE FARÀ EL PROFESSOR
    var preguntes = [
      "És Docker un projecte de codi obert?", "Ja has fet totes les pràctiques de Laravel?", 
      "Quants alumnes hi ha a la cafeteria?", "M'he trobat una clau, és teva?"
    ];
    var ajudes = [
      "Opció 'A' per 'Sí' i 'B' per 'No'", "Opció 'A' per 'Sí' i 'B' per 'No'", 
      "Opció 'A' per '14' i 'B' per '12'", "Opció 'A' per 'Sí' i 'B' per 'No'"
    ];
    var respostes = [
      1, 1, 
      2, 1
    ];

    var samuel = new Professor("Samuel", preguntes, ajudes, respostes, xocaSamuel, clauSamuel);



    // --> SI PREM LA TECLA D
    this.input.keyboard.once("keydown_D", event => {

      samuel.conversacioProfe();
    });

    // --> SI PREM LA TECLA X
    this.input.keyboard.once("keydown_X", event => {

      hiParla = true;
    });


    if (hiParla){

      samuel.continuacioConversacio();

      if (!clauSamuel){

        samuel.pregunta(contador);

        this.input.keyboard.once("keydown_A", event => {

          respostaJugador = 1;
        });
        this.input.keyboard.once("keydown_B", event => {

          respostaJugador = 2;
        });


        if (respostaJugador == 1 || respostaJugador == 2){

          contador++;
          // SI LA RESPOSTA ÉS CORRECTE
          if (respostaJugador == respostes[contador]){


            contadorAccertades++;

            // I SI HA RESPÓS TOTES LES PREGUNTES
            if (contadorAccertades >= 4){

              cursors = this.input.keyboard.createCursorKeys();
              samuel.fiPreguntes();
              hiParla = false;
              clauSamuel = true; // POSSEM TRUE, CONFORME EL PROFESSOR JA NO POT TORNAR A DONAR UNA CLAU
              xocaSamuel = false;

              tempsResposta = setTimeout(function(){
                informacioMoure.setVisible(true);
                resposta.setVisible(false);
                },4000);
            }
          }
          else{

            if(contador >= 4 && contadorAccertades != 4){

              samuel.error();
              cursors = this.input.keyboard.createCursorKeys();
              hiParla = false;
              xocaSamuel = false;

              tempsResposta = setTimeout(function(){
                informacioMoure.setVisible(true);
                resposta.setVisible(false);
                },2000);
            }
          }
          respostaJugador = 0;
        }
      }
      else{

        cursors = this.input.keyboard.createCursorKeys();
        hiParla = false;
        xocaSamuel = false;

        tempsResposta = setTimeout(function(){
          informacioMoure.setVisible(true);
          resposta.setVisible(false);
          },2000);
      }
    }
  }

  /*
  if (xocaOlga){
    
  }

  if (xocaXavier){

  }

  if (xocaSergi){
    
  }

  if (xocaAlicia){
   
  }

  if (xocaCafeteria){
    
  }*/
}