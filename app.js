// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = 0;
	this.y = y;
	this.speed = Math.ceil(Math.random() * 100) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x+=this.speed*dt;
	this.x > 505 ? this.x = 0: this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    
    this.sprite = 'images/char-boy.png';
	this.x = 200;
	this.y = 415;
	this.tickY = 83;
    this.tickX = 101;
	
};

Player.prototype.update = function(dt) {
  var that = this;

  allEnemies.forEach(function (el) {
    var enemyX = Number(el.x.toFixed());
    var enemyY = el.y;
    if (that.y === enemyY && (that.x  >= enemyX -80 && that.x < enemyX + 80)) {
      that.x = 203;
      that.y = 415;
    };
  });

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up':
      this.y -= this.tickY;
      break;
    case 'down':
      this.y += this.tickY;
      break;
    case 'left':
      this.x -= this.tickX;
      break;
    case 'right':
      this.x += this.tickX;
      break;
  };

  this.x <= 0 ? this.x = 0 : console.log('X: ');
  this.x >= 404 ? this.x = 404 : console.log(this.x);
  this.y >= 415 || this.y <= -83 ? this.y = 415 : console.log('Y: ' + this.y);

  var currentPlayerPosition = {
    x: this.x,
    y: this.y
  }

  //return currentPlayerPosition;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies =[new Enemy(83),new Enemy(166),new Enemy(249)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

