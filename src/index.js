
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};


function preload () {
  this.load.image('sky', 'assets/sky.png');

  this.load.image('bird', 'assets/bird.png')
}

const VELOCITY = 200;

let bird = null;
const flapVelocity = 275;
const initBirdPos = {x: config.width * 0.1, y: config.height / 2}
let totalDelta = null;

function create () {
  this.add.image(400, 300, 'sky');
  // set to middle of the ht , 1/10 of the width
  bird = this.physics.add.sprite(initBirdPos.x, initBirdPos.y, 'bird').setOrigin(0);
  //bird.body.velocity.x = VELOCITY;
  
  this.input.on('pointerdown', flap);

  this.input.keyboard.on('keydown_SPACE', flap);
}

// if bird pos x is same or larger than width of canvas go back the the left
// if bird postion x is smaller or equal to 0nthen move right
// bird y pos is < 0 or greater than canvas height
// then alert "you have lost"
function update(time, delta) {

  if ((bird.body.y - (bird.body.height / 2)) < 0 || (bird.body.y) >= config.height + (bird.height / 2)){
    restartBirdPosition();
  }

/*if (bird.body.x >= config.width - bird.body.width){
  bird.body.velocity.x  = -VELOCITY;
}
else if (bird.body.x <= 0){
  bird.body.velocity.x = VELOCITY;
}
 */
}

function restartBirdPosition() {
  bird.x = initBirdPos.x;
  bird.y = initBirdPos.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);
