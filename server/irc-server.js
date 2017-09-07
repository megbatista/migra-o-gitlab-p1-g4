// Load the TCP Library
var net = require('net');

// Keep track of the chat clients
var clients = [];

//Cria um objeto pra armazenar nicks
var nicks = {};

// Start a TCP Server
net.createServer(function (socket) 
{

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // Put this new client in the list
  clients.push(socket);

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  broadcast(socket.name + " joined the chat\n", socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) 
  {
    analisar(data);
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () 
  {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat.\n");
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

  if(args[0] == 'NICK') nick(args);
  else if(args[0] == 'USER') user(args);
  else if(args[0] == 'JOIN') join(args);
  else if(args[0] == 'PRIVMSG') privmsg(args);
  else
  {
    if(!socket.nick) broadcast(socket.name + " > " + data,socket);
    else broadcast(socket.nick + " > " + data,socket);
  }
}

function nick(args)
{
  if(!args[1])
  {
    socket.write('ERRO: nick faltando\n');
    return;
  }
  else if(nicks[args[1]])
  {
    socket.write('ERRO: o nick informado ja existe\n');
  }
  else
  {
    if(socket.nick)
    {
      delete nicks[socket.nick];
    }
    // associa ao atributo nick informado o valor: nome do socket(ip:porta);
    nicks[args[1]] = socket.name;
    socket.nick = args[1];
  }
}

function privmsg(args)
{
    if(!args[1])
    {
        socket.write("ERRO: nick não fornecido\n");
        return;
    }
    else if(nicks[args[1]])
    {
        clients.forEach(function(client)
        {
            if(client.nick === args[1]) 
            {
                client.write(socket.nick + " > ");
                
                for (var i=2 ; i<args.length ; i++)
                {
                    client.write(args[i]+" ");
                }
                
                client.write("\n");
            }
        });
        
        socket.write("Comando PRIV_MSG executado com sucesso!\n");
    }
    else
    {
        socket.write("ERRO: nick não encontrado!\n");
        return;
    }
    
}
function join(args){
  socket.write('Comando JOIN a ser implementado');
}

function user(args){
  socket.write('Comando USER a ser implementado');
}

}).listen(6667);


// Put a friendly message on the terminal of the server.
console.log("Servidor rodando na porta 6667\n");