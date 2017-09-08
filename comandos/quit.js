exports.executar = function(args, socket, clients){
	if(!args[1]) {
		//avisa que o comando precisa de uma mensagem para funcionar
		socket.write('QUIT: ERRO mensagem de saída obrigatória!\n');
		return;
	}else {
		//retorna a mensagem de saída para cada cliente conectado
    		clients.forEach(function (client) {
      		if (client === socket) {
			//retira o socket do vetor de clientes e encerra a conexão
			clients.splice(clients.indexOf(socket), 1);
			client.destroy();
			return;
		}
		client.write(socket.nick + ": ");
		//retorna também para o servidor
		process.stdout.write(socket.nick + ": ");
		for (var i = 0; i < args.length; ++i){
			client.write(args[i] + " ");
			process.stdout.write(args[i] + " ");
		}
      		client.write("\n user " + socket.user + " saiu do chat IRC\n");
    		});
    		process.stdout.write("\n user " + socket.user + " saiu do chat IRC\n")
		
	}	
}
