exports.executar = function(args, socket, clients){
	
	if(!(args[1] && args[2] && args[3] && args[4])){
		socket.write('USER: parametros insuficientes.\n');
		return;
	}
  	socket.user = args[1];
	
	var i = 4;
	var realname = '';

	while(typeof args[i] != 'undefined'){
		realname += args[i]+' ';
		i++;
	}
	var stringRealName = realname.split('');
	stringRealName.pop();
	socket.realname = stringRealName.join('');
}


