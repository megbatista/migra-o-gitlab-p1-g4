// Load the TCP Library
var net = require('net');

import { Nick } from '../comandos/nick'
//import { User } from '../comandos/nick'
import { Canal } from './Canal'
import { GerenciadorDeCanais } from './GerenciadorDeCanais'
import { GerenciadorDeClientes } from './GerenciadorDeClientes'

// Keep track of the chat clients
var clients = [];

//Armazena os canais criados nesse servidor
var canais = new GerenciadorDeCanais();


var clientes = new GerenciadorDeClientes();

//comandos implementados do irc(adicione aqui novas classes de comando)
var comandos = [];
comandos.push(new Nick());
//comandos.push(new User());

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 
  
  // Put this new client in the list
  clientes.add(socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
        analisar(data);
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
   	clientes.remove(socket);
	broadcast(socket.nick + " deixou o chat\n", socket);
  });
  
  // Send a message to all clients
  function broadcast(message, sender) {
    clientes.clients.forEach(function (client) {
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
	let comandoInformado = comando => comando.aplica(args);
	let classeDeComando = comandos.filter(comando => comando.aplica(comandoInformado));
	classeDeComando[0].executa(args, socket);
}

function welcome(){
  // Send a nice welcome message and announce
  socket.write("Bem vindo "+socket.nick+" (" +socket.name + ")"+"\n");
  broadcast(socket.nick+" ("+socket.name+") "+ " entrou no chat\n", socket);
}


}).listen(6667);


// Put a friendly message on the terminal of the server.
console.log("Servidor rodando na porta 6667\n");
