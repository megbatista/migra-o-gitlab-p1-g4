var part = this;

exports.executar = function(args, socket, canais){
	if(!args[1]){
		socket.write('461 PART :Parametros insuficientes.');
		return;
	}
        
	var canaisInformados = args[1].split(',');

	if(args[2]){
		var mensagem = '';
		for(let i = 2; i<args.length; i++){
			mensagem += args[i]+' ';
		}
	}
	part.executarInterno(canaisInformados, socket, canais);

}

exports.executarInterno = function(canaisASair, socket, canais){

	validar(canaisASair, socket);

        var indice;

	canaisASair.forEach(canalInformado =>{

		var valido = false;

		if(canais[canalInformado]){
			 indice = canais.indexOf(canalInformado);
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

function validar(canaisInformados, socket){
	canaisInformados.forEach(canal => {
		if( !((canal[0] == '#') || (canal[0] == '&') || (canal[0] == '+') || (canal[0] == '!') )){
			socket.write('403 PART ' +canal+' :Canal invalido. ');
			return;
		}
	});
}

