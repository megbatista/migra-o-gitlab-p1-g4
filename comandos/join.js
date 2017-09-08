function join(argv, canais, socket)
{
  //Lista de canais entrados.
  let listaDeCanais = [];
  //Lista de senhas entradas.
  let senhas = [];
  //Flag que verifica se o usuario deve ser removido de todos
  // os canais entrados.
  let sair = false;

  //Retira o primeiro termo(JOIN) do array argv.
  argv.shift();

  //Checa se a entrada é valida
  if(!argv[0])
  {
    socket.write('Entre com um nome valido');
    return;
  }

  //Checa se o comando foi JOIN 0
  if((argv[0] == '0') && (!argv[1]))
  {
    socket.write('Saindo de todos os canais!');
    sair = true;
  }

  //Checa se o objeto socket tem o atributo canaisEntrados e
  // cria um array como atributo do objetos socket.
  if(!(socket.hasOwnProperty('canaisEntrados')))
  {
    socket.canaisEntrados = [];
  }

  //Olha todas as strings procurando por nomes começando com #.
  for(palavra in argv)
  {

    //Se a palavra começar com # ela é considerada um canal e
    // guardada no array canaisEntrados.
    if(argv[palavra][0] == '#')
      listaDeCanais.push(argv[palavra]);
    //Se a palavra não começar com # ela é considerada senha e
    // guardada em senhas.
    else
      senhas.push(argv[palavra]);
  }


  //Checa se já existem objetos 'canais' com os mesmo nome no
  // array canais. Caso não existam, cria um novo objeto.
  for(canal in listaDeCanais)
  {
    //Checa se o canal existe.
    if(canais[listaDeCanais[canal]])
    {
      //O canal existe.

      //Checa se o canal não tem senha.
      if(!(canais[listaDeCanais[canal]].hasOwnProperty('senha')))
      {
        //O canal não tem senha.
        canais[listaDeCanais[canal]].usuarios.push(socket);
        socket.canaisEntrados.push(listaDeCanais[canal]);
      }
      //O canal tem senha.
      else
      {
        //Checa se a senha do canal é a mesma senha da posição
        // '0'  do array senha.
        if(canais[listaDeCanais[canal]].senha == senhas[0])
        {
          //A senha certa foi colocada.

          //remove a senha '0' da lista de senhas.
          senhas.shift();
          canais[listaDeCanais[canal]].usuarios.push(socket);
          socket.canaisEntrados.push(listaDeCanais[canal]);
        }
        //A senha errada foi colocada
        else {
          socket.write(listaDeCanais[canal] + ' precisa de senha\n');
        }
      }
    }
    //O canal não existe.
    else {
      //Verifica se uma senha foi entrada.
      if(senhas[0])
      {
        socket.write('Criando canal: ' + listaDeCanais[canal] +
        ' Com senha ' + senhas[0] + '\n');
        canais[listaDeCanais[canal]] = {usuarios: [socket], senha: senhas[0],
          nomeDoCanal: listaDeCanais[canal]};
        //Remove a senha usada da lista de senhas.
        senhas.shift();
        //Coloca o nome do canal entrado na propriedade do socket.
        socket.canaisEntrados.push(listaDeCanais[canal]);
      }
      //Nenhuma senha foi entrada.
      else
      {
        socket.write('Criando canal: ' + listaDeCanais[canal] + '\n');
        canais[listaDeCanais[canal]] = {usuarios: [socket],
          nomeDoCanal: listaDeCanais[canal]};
        socket.canaisEntrados.push(listaDeCanais[canal]);
      }
    }
  }
  //Verifica se JOIN 0 foi entrado.
  if(sair)
  {
    for(canal in socket.canaisEntrados)
    {
      canais[socket.canaisEntrados[canal]].usuarios.splice(socket, 1);
    }
    delete socket.canaisEntrados;
  }
}

module.exports = join;
