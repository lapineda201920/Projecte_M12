
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

var xocaAlumne = false;

var xocaSamuel = false;
var clauSamuel = false;
var xocaOlga = false;
var clauOlga = false;
var xocaXavier = false;
var clauXavier = false;
var xocaSergi = false;
var clauSergi = false;
var xocaAlicia = false;
var clauAlicia = false;
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
  jugador = this.physics.add.sprite(llocSpawn.x, llocSpawn.y, "ninoJugador", "jugador-esquerra.png");
  jugador.setSize(30, 30);
  jugador.setOffset(0, 20);

  this.physics.add.collider(jugador, arbres);
  this.physics.add.collider(jugador, superficies);

  this.physics.add.collider(jugador, persones, function(){
    xocaAlumne = true;
  });

  this.physics.add.collider(jugador, samuel, function(){
    xocaSamuel = true;
  });
  this.physics.add.collider(jugador, olga, function(){
    xocaOlga = true;
  });
  this.physics.add.collider(jugador, xavier, function(){
    xocaXavier = true;
  });
  this.physics.add.collider(jugador, sergi, function(){
    xocaSergi = true;
  });
  this.physics.add.collider(jugador, alicia, function(){
    xocaAlicia = true;
  });
  this.physics.add.collider(jugador, cafeteria, function(){
    xocaCafeteria = true;
  });


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


  

  // 5.B - AMB EL SEGÜENT CODI PODEM VEURE QUINES COSES LI HEM ACTIVAT EL 'COLLIDES'
  
  /*const debugGraphics = this.add.graphics().setAlpha(0.75);
  arbres.renderDebug(debugGraphics, {
    tileColor: null,
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
  });

  superficies.renderDebug(debugGraphics, {
    tileColor: null,
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
  });

  persones.renderDebug(debugGraphics, {
    tileColor: null,
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
  });*/
  
  

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
  informacioMoure = this.add
    .text(15, 15, "Utilitza les fletxes per moure't, i la 'D' per parlar!", {
      font: "20px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);

  resposta = this.add
      .text(15, 15, "Persona: !", {
      font: "20px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff"
    })
    .setScrollFactor(0);
    resposta.setVisible(false);
}







function update(time, delta) {


  const velocitat = 180;
  const velocitatPrevia = jugador.body.velocity.clone();

  // 11 - PAREM QUALSEVOL MOVIMENT ABANS DEL ÚLTIM FRAME
  jugador.body.setVelocity(0);


  // 12 - MOVIMENT HORITZONTAL
  if (cursors.left.isDown) {

    jugador.body.setVelocityX(-velocitat);
  }
  else if (cursors.right.isDown) {

    jugador.body.setVelocityX(velocitat);
  }


  // 13 - MOVIMENT VERTICAL
  if (cursors.up.isDown) {

    jugador.body.setVelocityY(-velocitat);
  }
  else if (cursors.down.isDown) {

    jugador.body.setVelocityY(velocitat);
  }


  // 14 - NORMALITZAR LA VELOCITAT PERQUÈ EL JUGADOR NO ES MOGUI MÉS DEPRESSA EN DIAGONAL
  jugador.body.velocity.normalize().scale(velocitat);


  // 15 - ACTUALITZEM L'ANIMACIÓ SI CAMINA ...
  if (cursors.left.isDown) {

    jugador.anims.play("jugador-esquerra-caminar", true);
  }
  else if (cursors.right.isDown) {

    jugador.anims.play("jugador-dreta-caminar", true);
  }
  else if (cursors.up.isDown) {

    jugador.anims.play("jugador-esquena-caminar", true);
  }
  else if (cursors.down.isDown) {

    jugador.anims.play("jugador-davant-caminar", true);
  }
  else{

    // 16 - SINÓ CAMINA, LA PAREM E POSSEM UNA IMATGE ON NO CAMINI

    jugador.anims.stop();

    if (velocitatPrevia.x < 0){
      jugador.setTexture("ninoJugador", "jugador-esquerra.png");
    }
    else if (velocitatPrevia.x > 0){

      jugador.setTexture("ninoJugador", "jugador-dreta.png");
    }
    else if (velocitatPrevia.y < 0) {
      
      jugador.setTexture("ninoJugador", "jugador-esquena.png");
    }
    else if (velocitatPrevia.y > 0) {
      
      jugador.setTexture("ninoJugador", "jugador-davant.png");
    }
  }


  // 17 - SI EL JUGADOR XOCA / ESTÀ AL COSTAT D'ALGUN --ALUMNE--
  if (xocaAlumne){

    // I SI PREM LA TECLA D
    this.input.keyboard.once("keydown_D", event => {

      informacioMoure.setVisible(false);
      
      var respostesAlumnes = [
        "Quina calor que fa", "Bon dia", "Aquesta pràctica és molt complicada", 
        "No trobo les ulleres", "Has vist al Samuel?", "Has vist a l'Olga?", 
        "Has vist al Marcel?", "CORONAVIRUS!", "Saps com sol·lucionar l'error de Dockers?",
        "Ja has fet l'IPOP?", "Avui hi ha entrepà de pinxos?", "Ufff..."
      ];
      var numeroRespostaAleatoria = Math.floor((Math.random() * respostesAlumnes.length));
      resposta.text = "Alumne: "+respostesAlumnes[numeroRespostaAleatoria];

      resposta.setVisible(true);

      setTimeout(function(){
        informacioMoure.setVisible(true);
        resposta.setVisible(false);
        },1000);

    });

    xocaAlumne = false;
  }


  // 18 - SI EL JUGADOR XOCA / ESTÀ AL COSTAT D'ALGUN --PROFESSOR--
  var tempsResposta;


  // --> SAMUEL <--//
  if (xocaSamuel){

    // I SI PREM LA TECLA D
    this.input.keyboard.once("keydown_D", event => {

      informacioMoure.setVisible(false);

      resposta.text = "Samuel: Bon dia!\n\n[Prem 'X' per continuar]";
      resposta.setVisible(true);

      tempsResposta = setTimeout(function(){
        informacioMoure.setVisible(true);
        resposta.setVisible(false);
        xocaSamuel = false;
        },2000);

      // SI EL JUGADOR PREM EL BOTÓ 'X' EN MENYS D'1 SEGON, 
      this.input.keyboard.once("keydown_X", event => {

        if(clauSamuel){

          informacioMoure.setVisible(false);

          resposta.text = "Samuel: Ja has anat al lavabo?";
          resposta.setVisible(true);

          tempsResposta = setTimeout(function(){
            informacioMoure.setVisible(true);
            resposta.setVisible(false);
            xocaSamuel = false;
            },1000);
        }
        else{
          
          var contador = 0;
          // --FALTA-- EL JUGADOR NO ES PODRÀ MOURE
          clearTimeout(tempsResposta); // EL TEMPORITZADOR ES PARARÀ (PER LO QUE LA CONVERSACIÓ NO S'AMAGARÀ)

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

          // I EL PROFESSOR LI FARÀ PREGUNTES
          function repetir(){
            
            resposta.text = "Samuel: Unes preguntes ràpides:\n\n--> " + preguntes[contador] + "\n\n[" + ajudes[contador] + "]";

            tempsResposta = setTimeout(function(){
              informacioMoure.setVisible(true);
              resposta.setVisible(false);
              xocaSamuel = false;
              },9000);

            var respostaJugador;
            game.input.keyboard.once("keydown_A", event => {
              
              clearTimeout(tempsResposta);
              respostaJugador = 1;
            });

            game.input.keyboard.once("keydown_B", event => {
              
              clearTimeout(tempsResposta);
              respostaJugador = 2;
            });

            

            console.log(respostaJugador);
            console.log(respostes[contador]);
            if (respostaJugador == respostes[contador]){

              contador++;

              if (contador >= 4){

                sumarClaus();
                resposta.text = "Samuel: Aquí tens la clau! Per cert, no tenies que anar al lavabo?";
                tempsResposta = setTimeout(function(){
                  informacioMoure.setVisible(true);
                  resposta.setVisible(false);
                  xocaSamuel = false;
                  },1000);
              }
            }
            /*else{

              informacioMoure.setVisible(true);
              resposta.setVisible(false);
              xocaSamuel = false;
              break;
            }*/
          }
          repetir();
        }
      });
    });
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