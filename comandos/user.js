export class User{

	aplica(args){
	return args[0] =='USER';
}


executa(args, socket){
	if(!args[1]){
		socket.write('ERRO: nick faltando');
		return;
	}else{
		socket.nick = args[1];
	}

}
}

