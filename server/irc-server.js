// Load the TCP Library
var net = require('net');
import { Nick } from '../comandos/nick'
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

	let classeDeComando = comandos.filter(comando => {comando.aplica(args);});
	classeDeComando[0].executa(args, socket);
}

function autenticar(data){
  let mensagem = String(data).trim();
  let args = mensagem.split(" ");

   if(args[0] == 'NICK') nick(args);
   else if(args[0] == 'USER') user(args);
  
}

function nick(args){
  if(!args[1]){
    socket.write('ERRO: nick faltando\n');
    return;
  }
  else if(nicks[args[1]]){
    socket.write('ERRO: o nick informado ja existe\n');
  }else{
    if(socket.nick){
      delete nicks[socket.nick];
    }
    // associa ao atributo nick informado o valor: nome do socket(ip:porta);
    nicks[args[1]] = socket.name;
    socket.nick = args[1];
  }
}
function join(args){
  socket.write('Comando JOIN a ser implementado\n');
}

function user(args){
  if(socket.user){
	delete users[socket.user];
  }
  users[args[1]] = socket.name;
  socket.user = args[1];
  let mode = parseInt(args[2]);
  if(!(mode == 0 || mode == 8)){
	socket.write('ERRO: parametros invalidos')
	return;
  }
  if(args[3] != '*') return;


}

function welcome(){
  // Send a nice welcome message and announce
  socket.write("Bem vindo "+socket.nick+" (" +socket.name + ")"+"\n");
  broadcast(socket.nick+" ("+socket.name+") "+ " entrou no chat\n", socket);
}


}).listen(6667);


// Put a friendly message on the terminal of the server.
console.log("Servidor rodando na porta 6667\n");
