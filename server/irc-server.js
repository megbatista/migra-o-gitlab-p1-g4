// Load the TCP Library
var net = require('net');
var nick = require('../comandos/nick');
var user = require('../comandos/user');
var quit = require('../comandos/quit');
var privmsg = require('../comandos/privmsg');
var ison = require('../comandos/ison');
var part = require('../comandos/part');

//Carrega os modulos em suas respectivas variaveis
var join = require('../comandos/join.js');
// Keep track of the chat clients
var clients = [];

//Cria um array para armazenar os canais
var canais = [];

// Start a TCP Server
net.createServer(function (socket) {
	
  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.push(socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) 
  {
    if(socket.nick && socket.user)
    {
        analisar(data);
    }    
    else
    {
        autenticar(data);
        if(socket.nick && socket.user)
        {
            welcome();
        }
    }
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () 
  {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.nick + " deixou o chat\n", socket);
  });

  // Send a message to all clients
  function broadcast(message, sender)
  {
    clients.forEach(function (client)    
    {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

    function analisar(data)
    {
    let mensagem = String(data).trim();
    let args = mensagem.split(" ");

        switch(args[0].toUpperCase())
        {
            case 'JOIN': join(args, canais, socket);
            break;
            case 'QUIT': quit.executar(args, socket, clients);
            break;
            case 'PRIVMSG': privmsg(args,canais,socket,clients);
            break;
            case 'ISON': ison.executar(args, socket, clients);
		    break;
	    case 'PART': part.executar(args, socket, canais);
	    break;
            case '': break;
            default: socket.write('421 '+args[0]+' :Comando desconhecido.\n');
        }
    }


    function autenticar(data)
    {
    let mensagem = String(data).trim();
    let args = mensagem.split(" ");

        switch(args[0].toUpperCase())
        {
            case 'NICK': nick.executar(args, socket, clients);
            break;
            case 'USER': user.executar(args, socket, clients);
            break;
            case 'JOIN': socket.write('451 * :Voce ainda nao se registrou. \n');
            break;
        }
    }

    function welcome()
    {
        // Send a nice welcome message and announce
        socket.write("\nBem vindo "+socket.nick+"! (" +socket.name + ")"+"\n");
        broadcast(socket.nick+" ("+socket.name+") "+ " entrou no chat\n", socket);
    }

}).listen(3000);


// Put a friendly message on the terminal of the server.
console.log("Servidor rodando na porta 3000\n");
