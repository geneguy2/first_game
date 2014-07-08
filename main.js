// We create our only state, called 'mainState'
var mainState = {
// We define the 3 default Phaser functions
preload: function() {
// This function will be executed at the beginning
// That's where we load the game's assets

game.load.image('player', 'assets/player.png');

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

// Tell Phaser that the player will use the Arcade physics engine
game.physics.arcade.enable(this.player);

// Add vertical gravity to the player
this.player.body.gravity.y = 500;

// Add arrow key functionality to the game
this.cursor = game.input.keyboard.createCursorKeys();

},
update: function() {
// This function is called 60 times per second
// It contains the game's logic
this.movePlayer();
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





};
  
// We initialise Phaser
// Create a 500px by 340px game in the 'gameDiv' element of the index.html
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
// Add the 'mainState' to Phaser, and call it 'main'
game.state.add('main', mainState);
game.state.start('main');
