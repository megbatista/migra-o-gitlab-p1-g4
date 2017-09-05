//import { Comando } from './comandos/comando'

export class Nick {

aplica(args){
	return args[0] =='NICK';
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
