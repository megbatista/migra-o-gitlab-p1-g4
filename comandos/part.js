exports.executar = function(args, socket, canais){
	if(!args[1]){
		socket.write('461 PART :Parametros insuficientes.');
		return;
	}

	if(args[2]){
		var mensagem;
		for(let i = 2; i<args.length; i++){
			mensagem += args[i]+' ';
		}
	}
	
        var canaisInformados = args[1].split(',');
	validar(canaisInformados);

        var indice;

	canaisInformados.forEach(canalInformado =>{

		var valido = canais.filter(canal=>{
			if(canal.nomeDoCanal == canalInformado){
			 indice = canais.indexOf(canal);
			 return true;	
			}
		});
		if(valido.length != 0){
			canais[args[1]].usuarios.splice(indice, 1);
			socket.canaisEntrados.splice(socket.indexOf(args[1]), 1);
			if(typeof mensagem != 'undefined'){
				socket.write(socket.nick +' PART '+canalInformado+' :'+mensagem);
			}else{
				socket.write(socket.nick +' PART '+canalInformado);
			}
				
		}else{
			socket.write('403 PART ' +args[1]+' :Canal informado nao existe. \n');
		}

	});
	
}

function validar(canaisInformados){
	canaisInformados.forEach(canal => {
		if(canal[0] != '#'){
			socket.write('403 PART ' +canal+' :Canal informado nao existe. ');
			return;
		}
	});
}
