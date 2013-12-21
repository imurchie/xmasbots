var
  five = require('johnny-five')
  , board = new five.Board()
;

board.on('ready', function() {

  var
    blue = new five.Led(3)
    , white = new five.Led(5)
  ;

  blue.fader = fader.bind(blue);
  white.fader = fader.bind(white);

  blue.fader();
  white.fader();

});

function fader() {

  this.speed = speed();
  if(typeof this.in !== 'boolean') {

    this.in = false;
  }
  if(this.in) {

    fadeOut(this);
  }
  else {

    fadeIn(this);
  }
  setTimeout(function() {

    this.fader();

  }.bind(this), this.speed);
};

function fadeOut(led) {

  led.fade(127, led.speed * 5);
  led.in = false;
};

function fadeIn(led) {

  led.fade(255, led.speed / 2);
  led.in = true;
};

function speed() {

  return Math.round((Math.random() * 500) + 200);
}
