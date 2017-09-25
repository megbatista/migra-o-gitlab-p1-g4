// Load the TCP Library
var net = require('net');
var nick = require('../comandos/nick');
var user = require('../comandos/user');
var quit = require('../comandos/quit');
var privmsg = require('../comandos/privmsg');
var ison = require('../comandos/ison');
var part = require('../comandos/part');
var ping = require('../comandos/pingpong');
var kick = require('../comandos/kick');
var userhost = require('../comandos/userhost');

//Carrega os modulos em suas respectivas variaveis
var join = require('../comandos/join.js');
// Keep track of the chat clients
var clients = [];

//Cria um array para armazenar os canais
var canais = [];

//Cria um nome para o servidor
var serverName = 'irc.servidor';

// Start a TCP Server
const server = net.createServer(function (socket) {
	
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
            case 'QUIT': quit.executar(args, socket, clients, canais);
            break;
            case 'PRIVMSG': privmsg(args,canais,socket,clients);
            break;
            case 'ISON': ison.executar(args, socket, clients);
<<<<<<< server/irc-server.js
		    	break;
	    		case 'PART': part.executar(args, socket, canais);
	    		break;
				case 'PING': ping.executar(args, socket, serverName);
	    		break;
				case 'KICK': kick.executar(args, socket, canais, clients);
				break;
				case 'USERHOST': userhost.executar(args, socket, clients, server);
		        break;
	            case 'PART': part.executar(args, socket, canais);
	            break;
	            case 'NICK': nick.executar(args, socket, clients);
	        	break;
                case '': break;
                default: socket.write(':'+server.name+'421 '+args[0]+' :Comando desconhecido.\n');
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
            case 'JOIN': socket.write(':'+server.name+' 451 * :Voce ainda nao se registrou. \n');
            break;
        }
    }

    function welcome()
    {
        // Send a nice welcome message and announce
        socket.write(":"+server.name+" 001 "+socket.nick+" :Bem vindo ao servidor IRC "+socket.nick+"! (" +socket.name + ")"+"\n");
	socket.write(":"+server.name+" 002 "+socket.nick+" :Seu host e: "+server.name+"["+server.address().address+"]\n");
	socket.write(":"+server.name+" 003 "+socket.nick+" :Este servidor foi criado em 2017\n");
        broadcast(":"+server.name+" * :"+socket.nick+"["+socket.name+"] "+ " entrou no chat.\n", socket);
    }

});
server.listen({
	host: 'localhost',
	port: 3000 });
server.name = 'localhost';



// Put a friendly message on the terminal of the server.
console.log("Servidor rodando na porta 3000\n");
