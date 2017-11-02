var server = require('ws').Server;
var s = new server({ port: 5001});

var rooms = new Array();

s.on('connection', function(ws){
	ws.on('message', function(message){
		console.log(">> "+message);
		s.clients.forEach(function e(client){
			//console.log(client);
			/*if(client != ws){
				console.log(message);
				client.send(message);
			}*/
			s.broadcast(message);
		});

		//ws.send("Servidor: " +message);
	});

	ws.on('close', function(){
		console.log("Eu perdi um cliente");
	});

	console.log("Um cliente a mais conectado");
});

s.broadcast = function broadcast(data) {
  s.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

