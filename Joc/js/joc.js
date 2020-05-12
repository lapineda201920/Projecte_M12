
const config = {
  type: Phaser.AUTO,
  width: 844,
  height: 470,
  parent: "contenidor",
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let controls;

function preload() {
  console.log("Entra al preload()!");
  this.load.image("tiles", "img/tilesets/tileset-shinygold2.png");
  this.load.tilemapTiledJSON("map", "mapes/mapa_la_pineda.json");
  console.log("Surt del preload()!");
}

function create() {
  console.log("Entra al create()!");
  const map = this.make.tilemap({ key: "map" });


  const tileset = map.addTilesetImage("tileset-shinygold2", "tiles");

  
  const terra = map.createStaticLayer("Capa terra", tileset, 0, 0);
  const arbres = map.createStaticLayer("Capa arbres", tileset, 0, 0);
  const superficies = map.createStaticLayer("Capa superficies", tileset, 0, 0);

  const camera = this.cameras.main;

  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5
  });

  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  this.add
    .text(16, 16, "Utilitza les fletxes per moure't!", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);

  console.log("Surt del create()!");
}

function update(time, delta) {
  console.log("Entra al update()!");
  controls.update(delta);
}