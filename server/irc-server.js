// Load the TCP Library
var net = require('net');
var nick = require('../comandos/nick');
var user = require('../comandos/user');

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // Put this new client in the list
  clients.push(socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    if(socket.nick && socket.user){
        analisar(data);
    }else{
	autenticar(data);
	if(socket.nick && socket.user) {
		welcome();
	}

    }
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.nick + " deixou o chat\n", socket);
  });
  
  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

function analisar(data){
  let mensagem = String(data).trim();
  let args = mensagem.split(" ");

	switch(args[0].toUpperCase()){
		case 'JOIN': socket.write('Comando Join executado');
		break;
		default: socket.write(args[0]+': Comando desconhecido.')
	}
}

function autenticar(data){
  let mensagem = String(data).trim();
  let args = mensagem.split(" ");

  switch(args[0].toUpperCase()){
	case 'NICK': nick.executar(args, socket, clients);
	break;
	case 'USER': user.executar(args, socket, clients);
	break;
	case 'JOIN': socket.write('Voce ainda nao se registrou. \n');
	break;
	}
}

function welcome(){
  // Send a nice welcome message and announce
  socket.write("\nBem vindo "+socket.nick+"! (" +socket.name + ")"+"\n\n");
  broadcast(socket.nick+" ("+socket.name+") "+ " entrou no chat\n", socket);
}


}).listen(3000);


// Put a friendly message on the terminal of the server.
console.log("Servidor rodando na porta 6667\n");
