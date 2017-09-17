exports.executar = function(args, socket, canais){
	if(!args[1]){
		socket.write('461 PART :Parametros insuficientes.');
		return;
	}

	if(args[2]){
		var mensagem = '';
		for(let i = 2; i<args.length; i++){
			mensagem += args[i]+' ';
		}
	}
	
        var canaisInformados = args[1].split(',');
	validar(canaisInformados);

        var indice;

	canaisInformados.forEach(canalInformado =>{

		var valido = false;

		if(canais[canalInformado]){
			 indice = canais.indexOf(canal);
			 valido = true;	
		}
		
		if(valido){
			canais[canalInformado].usuarios.splice(indice, 1);
			socket.canaisEntrados.splice(socket.canaisEntrados.indexOf(canalInformado), 1);
			if(typeof mensagem != 'undefined'){
				socket.write(socket.nick +' PART '+canalInformado+' :'+mensagem+'\n');
				canais[canalInformado].usuarios.forEach(usuario => {
					usuario.write(socket.nick +' PART '+canalInformado+' :'+mensagem+'\n');
				});
			}else{
				socket.write(socket.nick +' PART '+canalInformado+'\n');
				canais[canalInformado].usuarios.forEach(usuario => {
					usuario.write(socket.nick +' PART '+canalInformado+'\n');
				});
			}
				
		}else{
			socket.write('403 PART ' +canalInformado+' :Canal informado nao existe. \n');
		}

	});
	
}

function validar(canaisInformados){
	canaisInformados.forEach(canal => {
		if(canal[0] != '#'){
			socket.write('403 PART ' +canal+' :Canal invalido. ');
			return;
		}
	});
}
