exports.executar = function(args, socket, serverName){

	//verifica as entradas do cliente
	//se o segundo argumento for o nick envia o nome do servidor
	if(args[1] == socket.nick){
		socket.write('PONG: ' + serverName + '\n');

	//se faltar o parâmetro envia o erro indicado na rfc
	}else if(args.length == 1){
		socket.write('409 PING: Origem não especificada\n');

	//envia um erro caso o nick não seja o próprio socket
	}else if(args[1] != socket.nick){
		socket.write('402 PING: Nome inexistente\n');
	}
}
