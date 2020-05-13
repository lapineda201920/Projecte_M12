
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


  // 5 - LOCALITZEM EL LLOC ON FARÀ SPAWN EL JUGADOR
  const llocSpawn = map.findObject("Lloc Spawn", obj => obj.name === "Lloc Spawn");


  // 6 - LI AFEGIM FÍSICA AL JUGADOR (LLOC ON APAREIXARÀ-X, LLOC ON APAREIXARÀ-Y, "", "")
  jugador = this.physics.add.sprite(llocSpawn.x, llocSpawn.y, "ninoJugador", "jugador-esquerra.png");
  jugador.setSize(30, 30);
  jugador.setOffset(0, 20);
  this.physics.add.collider(jugador, arbres);
  this.physics.add.collider(jugador, superficies);
  this.physics.add.collider(jugador, persones);


  // 7 - LI DIEM QUINES CAPES VOLEM QUE S'EXECUTI EL 'COLLIDES'
  arbres.setCollisionByProperty({ collides: true });
  superficies.setCollisionByProperty({ collides: true });
  persones.setCollisionByProperty({ collides: true });


  

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
  this.add
    .text(16, 16, "Utilitza les fletxes per moure't!", {
      font: "20px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);
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
}