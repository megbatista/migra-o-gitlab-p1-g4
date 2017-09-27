# Manual do desenvolvedor

## Projeto 1 - Servidor IRC

### Instalação do ambiente de desenvolvimento

Para a correta execução do servidor é necessária a instalação do Node.js.

No terminal do ambiente Linux digite o seguinte comando:
```
sudo apt-get install nodejs
```
Caso esteja usando o Windows,  acesse o [site oficial](https://nodejs.org/en/) do Node.js e baixe o instalador.

Para verificar se o Node.js está instalado execute o comando:
```
node --version
```
### Servidor IRC

Um servidor IRC utiliza um protocolo de mesmo nome para realizar
 a comunicacao entre duas máquinas através de sockets.

 Para rodar o servidor, estando com o terminal na pasta onde está o arquivo
 **irc-server.js** insira o comando:
 ```
 node irc-server.js
 ```
 O servidor indicará que estará rodando na porta padrão do protocolo IRC: 6667.

Para acessar o servidor abra outro terminal, e acesse usando a ferramenta telnet
e informe o endereço local da sua máquina e a porta em que o servidor está rodando:
```
telnet 127.0.0.1 6667
```

### Comandos

#### privmsg

Verifica se há algum argumento depois da chamada da função. Se não houver, a função não irá executar.
```
 if(!args[1])
     {
         socket.write("ERRO: nick/canal não fornecido!\n");
         return;
     }

```

Nick não pode comecar com #, verifica também se args[1] é um nick existente.
O cliente que possuir o nick igual ao especificado receberá o privmsg.
```
 else if(args[1][0]!='#' && clients.filter(client => client.nick === args[1]).length)
     {
         clients.forEach(function(client)
         {
             if(client.nick === args[1])
             {
                
                client.write(socket.nick + " > ");
                    
                for(var i=2;i<args.length;i++)
                {
                    client.write(args[i]+" ");
                }
                   
                client.write("\n");
            }
        });
            
        socket.write("Comando PRIVMSG para nick executado com sucesso!\n");
    }
```

Agora verifica se o socket, ou seja, quem digitou o comando PRIVMSG, está no canal
para o qual ela está tentando mandar a PRIVMSG. Se não estiver, a mensagem não será enviada.
Primeiro verifica se o socket tem a lista de canais entrados, e se tiver, verifica 
se o canal args[1] está nessa lista.

```
 else if(canais[args[1]])
    {       
        if(socket.hasOwnProperty('canaisEntrados'))
        {
            if(socket.canaisEntrados.filter(canal => canal ==  args[1]).length)
            {
                //executa essa função para cada cliente no array clients
                canais[args[1]].usuarios.forEach(function(client)
                {
                    if(client != socket)
                    {
                        client.write(":"+socket.nick + "!~"+socket.user+"@"+
			            socket.address().address+ " PRIVMSG "+args[1]+" :");
                    
                        for(var i=2;i<args.length;i++)
                        {
                            client.write(args[i]+" ");
                        }   
                
                        client.write("\n");
                    }                    
                    
                });//fim do forEach
                        
                socket.write("Comando PRIVMSG para canal executado com sucesso!\n");
            }
            else socket.write("ERRO: você não entrou nesse canal!\n");
        }
        else socket.write("ERRO: você não entrou nesse canal!\n");
    }
```




