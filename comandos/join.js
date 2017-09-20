var part = require('../comandos/part');

exports.executar = function(args, socket, canais)
{
  //Lista de canais entrados.
  let listaDeCanais = [];
  //Lista de senhas entradas.
  let senhas = [];
  //Flag que verifica se o usuario deve ser removido de todos
  // os canais entrados.
  let sair = false;

  //Checa se a entrada é valida
  if(!argv[1])
  {
    socket.write('461 JOIN :Parametros insuficientes.\n');
    return;
  }

  //Checa se o comando foi JOIN 0
  if((argv[1] == '0') && (!argv[2]))
  {
    socket.write('Saindo de todos os canais!\n');
    sair = true;
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
    let temp = argv[1].split(',');
    for(i in temp)
    {
      if( (temp[i][1] == '#') || (temp[i][1] == '&') || (temp[i][1] == '+') || (temp[i][1] == '!') )
        listaDeCanais.push(temp[i]);
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
      canais[listaDeCanais[i]] = {usuarios: [socket], nomeDoCanal: listaDeCanais[canal], criador: socket.nick};
      socket.canaisEntrados.push(listaDeCanais[canal]);
      
    }
  }
  //Verifica se JOIN 0 foi entrado.
  if(sair)
  {
    part.executarInterno(socket.canaisEntrados, socket, canais);
  }
}
