exports.executar = function(args, socket, clients){
	
	var size = 0;

	for(var k = 0;k<args.length;k++){

		size += args[k].length;

	}

	if(args.length == 1){
		socket.write('461 ISON :Parametros insuficientes\n');
		return;

	}
	if(size < 512){
		
		var listaNicksAtivos = '';

		for(var i = 1; i < args.length; i++){
		
			for(var j = 0; j < clients.length; j++){
			
				if(clients[j].nick == args[i]){

					listaNicksAtivos += args[i] + ' ';

				}
			}
		}
		socket.write('303 ISON :'+ listaNicksAtivos+'\n');
	}else{

		socket.write('ERRO: Muito nicks informados\n');
		return;
	}
}
