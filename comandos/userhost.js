exports.executar = function(args, socket, clients, server){
	if(!args[1]){
		socket.write(':'+server.name+' 461'+socket.nick+' USERHOST :Parametros Insuficientes\n');
		return;
	}
	
	args.shift();
	args.forEach(nick => {
		clients.forEach(client => {
			if(client.nick == nick){
				socket.write(':'+server.name+' 302 '+socket.nick+' :'+client.nick+'=+'+client.user+'@'+server.name+'\n');
			}
		});
	});
}
