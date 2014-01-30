"use strict";

var Client = {
  socket: io.connect(),

  init: function() {
    this.listen();
  },

  listen: function () {
    this.socket.on("connect", function() {
      console.log("client connected");
    });

    this.socket.on('welcome', function(msg) {
      console.log(msg); 
    });
  }
};

(function() {
  Client.init();
})();

