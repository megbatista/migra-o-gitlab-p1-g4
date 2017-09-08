// Load the TCP Library
var net = require('net');

//Carrega os modulos em suas respectivas variaveis
var join = require('../comandos/join.js');
// Keep track of the chat clients
var clients = [];

//Cria um objeto pra armazenar nicks
var nicks = {};
//Cria um array para armazenar os canais
var canais = [];

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.push(socket);

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  broadcast(socket.name + " joined the chat\n", socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    analisar(data);
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat.\n");
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

  if(args[0] == 'NICK') nick(args);
  else if(args[0] == 'USER') user(args);
  else if(args[0] == 'JOIN') join(args, canais, socket);
  else if(args[0] == 'PRINT') print(canais);
  else socket.write("ERRO: comando inexistente");
}

function nick(args){
  if(!args[1]){
    socket.write('ERRO: nick faltando');
    return;
  }
  else if(nicks[args[1]]){
    socket.write('ERRO: o nick informado ja existe');
  }else{
    if(socket.nick){
      delete nicks[socket.nick];
    }
    // associa ao atributo nick informado o valor: nome do socket(ip:porta);
    nicks[args[1]] = socket.name;
    socket.nick = args[1];
  }
}

function user(args){
  socket.write('Comando USER a ser implementado');
}

function print(vetorDeCanais)
{
  for(canal in vetorDeCanais)
  {
    socket.write(vetorDeCanais[canal].nomeDoCanal + '\n');
    for(usuario in vetorDeCanais[canal].usuarios)
    {
      socket.write(' ' + vetorDeCanais[canal].usuarios[usuario].nick + '\n');
    }
  }
}
}).listen(6667);


// Put a friendly message on the terminal of the server.
console.log("Servidor rodando na porta 6667\n");
