export class Canal{
	constructor(nome){
		this._nome=nome;
		this._users = {};
		this._contador = 0;
	}

	add(socket){
		if(this._users[socket.nick]){
			socket.write('ERRO: este nick ja esta sendo usado');
			return;	
		}
		this._users[socket.nick] = socket;
		this._contador++;
	}
	
	remove(socket){
		if(!this._users[socket.nick]){
			socket.write('ERRO: usuario nao logado neste canal');
		}
		delete this._users[socket.nick];
	}

	busca(socket){
		if(!this._users[socket.nick]){
			socket.write('ERRO: usuario nao logado neste canal');
			return;
		}
		return this._users[socket.nick];
	}
}
