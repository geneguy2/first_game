// We create our only state, called 'mainState'
var mainState = {
// We define the 3 default Phaser functions
preload: function() {
// This function will be executed at the beginning
// That's where we load the game's assets

game.load.image('player', 'assets/player.png');
game.load.image('wallV', 'assets/wallVertical.png');
game.load.image('wallH', 'assets/wallHorizontal.png');
game.load.image('coin', 'assets/coin.png');

},


create: function() {
// This function is called after the preload function
// Here we set up the game, display sprites, etc.
// Make the stage color blue
game.stage.backgroundColor = '#3498db';

// Create the physics engine
game.physics.startSystem(Phaser.Physics.ARCADE);

// Create a state variable
this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

// Change the anchor point of player
this.player.anchor.setTo(0.5, 0.5);

// Display the score
this.scoreLabel = game.add.text(30, 30, 'score: 0',
{ font: '18px Arial', fill: '#ffffff' });
// Initialise the score variable
this.score = 0;


// Display the coin
this.coin = game.add.sprite(60, 140, 'coin');
// Add Arcade physics to the coin
game.physics.arcade.enable(this.coin);
// Set the anchor point of the coin to its center
this.coin.anchor.setTo(0.5, 0.5);

// Tell Phaser that the player will use the Arcade physics engine
game.physics.arcade.enable(this.player);

// Add vertical gravity to the player
this.player.body.gravity.y = 500;

// Add arrow key functionality to the game
this.cursor = game.input.keyboard.createCursorKeys();

// Create our wall group with Arcade physics
this.walls = game.add.group();
this.walls.enableBody = true;
// Create the 10 walls
game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right
game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right
game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right
var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
middleTop.scale.setTo(1.5, 1);
var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
middleBottom.scale.setTo(1.5, 1);
// Set all the walls to be immovable
this.walls.setAll('body.immovable', true);

this.createWorld();






},
update: function() {
// This function is called 60 times per second
// It contains the game's logic
// Tell Phaser that the player and the walls should collide
game.physics.arcade.collide(this.player, this.walls);
game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
this.movePlayer();


if (!this.player.inWorld) {
this.playerDie();
}
},
// And here we will later add some of our own functions

// Move Player
movePlayer: function() {
		if (this.cursor.left.isDown) {
			this.player.body.velocity.x = -200;
		}
		else if (this.cursor.right.isDown) {
			this.player.body.velocity.x = 200;
		}
		else {
			this.player.body.velocity.x = 0;
		}
    
		if (this.cursor.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -320;
		}      
	},
	
takeCoin: function(player, coin) {
// Update the score
this.score += 5;
this.scoreLabel.text = 'score: ' + this.score;
// Change the coin position
this.updateCoinPosition();
},




updateCoinPosition: function() {
// Store all the possible coin positions in an array
var coinPosition = [
{x: 140, y: 60}, {x: 360, y: 60}, // Top row
{x: 60, y: 140}, {x: 440, y: 140}, // Middle row
{x: 130, y: 300}, {x: 370, y: 300} // Bottom row
];
// Remove the current coin position from the array
// Otherwise the coin could appear at the same spot twice in a row
for (var i = 0; i < coinPosition.length; i++) {
if (coinPosition[i].x === this.coin.x) {
coinPosition.splice(i, 1);
}
}
// Randomly select a position from the array
var newPosition = coinPosition[
game.rnd.integerInRange(0, coinPosition.length-1)];
// Set the new position of the coin
this.coin.reset(newPosition.x, newPosition.y);
},

playerDie: function() {
game.state.start('main');
},



};
  
// We initialise Phaser
// Create a 500px by 340px game in the 'gameDiv' element of the index.html
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
// Add the 'mainState' to Phaser, and call it 'main'
game.state.add('main', mainState);
game.state.start('main');
