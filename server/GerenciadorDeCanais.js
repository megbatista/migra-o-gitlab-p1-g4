export class GerenciadorDeCanais{

	constructor(socket){
		this._canais={};
		this._socket = socket;
		this._contador = 0;
	}
	
	adicionar(canal){
		if(this._canais[canal.nome]){
			this._socket.write('ERRO: canal ja existe');
			return;
		}
		this._canais[canal.nome] = canal.users;
		this._contador++;
	}
	remover(canal){
		if(!this._canais[canal.nome]){
			this._socket.write('ERRO: o canal nao foi criado');
			return;
		}
		delete this._canais[canal.nome];
		this._contador--;
	}

	listaTodos(){
		return this._canais;
	}
	
	get length(){
		return this._contador;
	}
}
