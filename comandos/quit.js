exports.executar = function(args, socket, clients, canais){
	var msg = args.join(" ");
	var saida = 'JOIN 0'.split(" ");
	var join = require('../comandos/join.js');
	if(!args[1]) {
		//avisa que o comando precisa de uma mensagem para funcionar
		socket.write('QUIT: mensagem de saída obrigatória!\n');
		return;
	}else {
			//retorna a mensagem de saída para cada cliente conectado
			clients.forEach(function (client) {
			
			if (client === socket) {
				return;
			}else {
				client.write(socket.nick + "> " + msg + "; User " +
							   socket.user + " saiu do chat IRC\n");
			}

    		});
		process.stdout.write(socket.nick + "> " + msg + "; User " +
									socket.user + " saiu do chat IRC\n");
		//retira o socket do vetor de clientes e encerra a conexão
		//chama o comando join 0 no modulo join para retirar o cliente dos canais
		join(saida, canais, socket);
		clients.splice(clients.indexOf(socket), 1);
		socket.destroy();
	}	
}
