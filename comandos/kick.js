exports.executar = function(args, socket, canais, clients){
	var canalInformado = args[1];
	var banido = args[2];
	var valido = false;
	var funcionou = false;
	var possuimsg = false;
	var estanocanal = false;
	var bans = [];
	
	if(!args[2]){
		socket.write('461 KICK: Parâmetros Insuficientes\n');
	}
	if(args[3]){
		for(var i = 3; i < args.length; i++){
			var msg = args[i] + " ";
		}
		possuimsg = true;
	}
	if(canais[canalInformado]){
		 indice = canais.indexOf(canal);
		 valido = true;	
	}else{
		socket.write('403 KICK: Canal Inexistente\n');
	}
	if(valido){
		canais[canalInformado].usuarios.forEach(function(usuario) {
			if(usuario === socket){
				estanocanal = true;		
			}
		});
	}

	if(!estanocanal){
		socket.write('442 KICK: Você não está no canal\n');	
	}
		
	if(valido && estanocanal){
		canais[canalInformado].usuarios.forEach(function(usuario) {
			if(usuario.user === banido && usuario.user != bans[banido]){
				funcionou = true;
				canais[canalInformado].usuarios.splice(canais[canalInformado].usuarios.indexOf(usuario), 1);
				usuario.canaisEntrados.splice(indice, 1);
			}
		});
	}

	if(funcionou){
		clients.forEach(function(client){
			if(client.user === banido){
				client.write('KICK: Você foi banido\n');
				bans.push(client.user);
			}
		});

		canais[canalInformado].usuarios.forEach(function(usuario) {
			if(possuimsg){
				usuario.write(socket.nick + ' KICK: ' + canalInformado + ' ' + banido + ' :' + msg + '\n');
			}else{
				usuario.write(socket.nick + ' KICK: ' + canalInformado + ' ' + banido + '\n');
			}
		});

	}else socket.write('441 KICK: Usuário Inexistente\n');
}
