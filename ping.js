var five = require("johnny-five"),
  board, ping;

board = new five.Board();

board.on("ready", function() {

  // Create a new `ping` hardware instance.
  ping = new five.Ping({
    pin: 7,
    freq: 10
  });

  var green = new five.Led(5)
    , white = new five.Led(3)
  ;
  green._on = true;
  white._on = true;

  // "data" get the current reading from the ping
  ping.on("data", function(err, value) {
    console.log("data", value);
  });

  ping.on("change", function(err, value) {
    green.fade = this.inches * 50;
//    var fade = (this.inches / 20) * 255;
//    fade = Math.min(fade, 255);
//    fade = Math.max(fade, 0);

    console.log("fading to", green.fade, "at inches:", this.inches);
    // green.strobe(fade);
    // white.strobe(fade);
    if(green.timer) clearTimeout(green.timer);
    toggle.apply(green);

    // white.fade = (40 - this.inches) * 50;
    white.fade = this.inches * 100;
    if(white.timer) clearTimeout(white.timer);
    toggle.apply(white);
  });
});

function toggle()
{
  if (this._on) {
    this.off();
  } else {
    this.on();
  }
  this._on = !this._on;
  this.timer = setTimeout(toggle.bind(this), this.fade);
}
