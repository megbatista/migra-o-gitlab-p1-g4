var part = require('../comandos/part');

exports.executar = function(args, canais, socket)
{
  //Lista de canais entrados.
  let listaDeCanais = [];
  //Lista de senhas entradas.
  let senhas = [];

  //Checa se a entrada é valida
  if(!args[1])
  {
    socket.write('461 JOIN :Parametros insuficientes.\n');
    return;
  }

  //Checa se o comando foi JOIN 0
  if((args[1] == '0') && (!args[2]))
  {
    socket.write('Saindo de todos os canais!\n');
    part.executar(socket.canaisEntrados, socket, canais);
    return;
  }

  //Checa se o objeto socket tem o atributo canaisEntrados e
  // cria um array como atributo do objetos socket.
  if(!(socket.hasOwnProperty('canaisEntrados')))
  {
    socket.canaisEntrados = [];
  }

  //Computa as entradas do primeiro termo após o comando.
  //Executa dentro de chaves '{}' para que a variavel temp
  // exista apenas dentro das chaves '{}'
  {
    let temp = args[1].split(',');
    for(i in temp)
    {
      if( (temp[i][0] == '#') || (temp[i][0] == '&') || (temp[i][0] == '+') || (temp[i][0] == '!') )
        listaDeCanais.push(temp[i]);
	socket.write(':'+socket.nick+'!'+socket.user+'@localhost JOIN '+temp[i]+'\n');
    }
  }

  //Checa se já existem objetos 'canais' com os mesmo nome no
  // array canais. Caso não existam, cria um novo objeto.
  for(i in listaDeCanais)
  {
    //Checa se o canal existe.
    if(canais[listaDeCanais[i]])
    {
      //O canal existe.
      canais[listaDeCanais[i]].usuarios.push(socket);
      socket.canaisEntrados.push(listaDeCanais[i]);
      socket.write('Você entrou no canal '+listaDeCanais[i]+'!\n');
    }
    //O canal não existe.
    else
    {

      socket.write('Criando canal: ' + listaDeCanais[i] + '\n');
      canais[listaDeCanais[i]] = {
        usuarios: [socket], nomeDoCanal: listaDeCanais[i],
        criador: socket.nick, operadores: [], topico: '',
        //Flags
        anonymous:    false,  inviteOnly:  false,   moderated: false,
        quiet:        false,  privateChan: false,   secret:    false,
        settableTopic: true,  reopServ:    false
      };
      socket.canaisEntrados.push(listaDeCanais[i]);
    }
  }
}
