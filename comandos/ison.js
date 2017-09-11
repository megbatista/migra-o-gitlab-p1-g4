exports.executar = function(args, socket, clients){
	
	for(var k = 0;k<args.length;k++){

		var size = size + args[k].length;

	}

	if(args.length < 2){

		socket.write('ERR_NEEDMOREPARAMS: too few arguments.\n-> ISON :[<nick> {<space><nick>}]');
		return;

	}else if(size < 512){

		for(var i = 1; i < args.length; i++){
		
			for(var j = 0; j < clients.length; j++){
			
				if(clients[j].nick == args[i]){

				socket.write('User '+ args[i] +' is on.\n');

				}
			}
		}
	}else{

		socket.write('ERR: Too many nicknames');
		return;
	}
}