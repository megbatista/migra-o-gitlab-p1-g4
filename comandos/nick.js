exports.executar = function(args, socket, clients){
	var nickExiste = clients.filter(client => client.nick === args[1]).length != 0;
	if(!args[1]){
		socket.write('NICK: nick não informado.\n');
		return;
	}else if(nickExiste){
		socket.write('NICK: o nick informado ja está em uso.\n');
		return;
	}else{
		socket.nick = args[1];
	}	
}
