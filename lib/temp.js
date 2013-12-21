// var five = require("../../../johnny-five/lib/johnny-five.js");
var five = require("johnny-five");
var Thermistor;

(function() {
  var adcres = 1023;
  // Beta parameter
  var beta = 3950;
  // 0°C = 273.15 K
  var kelvin = 273.15;
  // 10 kOhm
  var rb = 10000;
  // Ginf = 1/Rinf
  var ginf = 120.6685;

  Thermistor = {
    celsius: function(raw) {
      var rthermistor, tempc;

      rthermistor = rb * (adcres / raw - 1);
      tempc = beta / (Math.log(rthermistor * ginf));

      return tempc - kelvin;
    },
    fahrenheit: function(raw) {
      return (this.celsius(raw) * 9) / 5 + 32;
    }
  };
})();

new five.Board().on("ready", function() {
  var red   = new five.Led("O0"); //.strobe(250);
  var green = new five.Led("O1"); //.strobe(250);

  new five.Sensor("I0").on("change", function() {
    console.log("F: ", Thermistor.fahrenheit(this.value));
    console.log("C: ", Thermistor.celsius(this.value));
    if(Thermistor.celsius(this.value) <= 25) {
      red.off();
      green.strobe(250);
    } else {
      green.off();
      red.strobe(250);
    }
  });
});
