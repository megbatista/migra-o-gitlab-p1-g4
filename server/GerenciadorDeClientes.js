export class GerenciadorDeClientes{
	constructor(){
		this._clientsMap = {};
		this._clients = [];
	}

	add(socket){
		this._clientsMap[socket.name] = socket;
		this._clients.push(socket);
	}
	remove(socket){
		delete this._clients[socket.name];
		this._clients.splice(clients.indexOf(socket), 1);
	}
	get clients(){
		return this._clients;
	}
	get clientsMap(){
		return this._clientsMap;
	}
}
