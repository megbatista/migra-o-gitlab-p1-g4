## Projeto 1 - Servidor IRC

### Instalação do ambiente de desenvolvimento

Para a correta execução do servidor é necessária a instalação do Node.js.

**No Linux:**

Antes de tudo iremos instalar o NVM(node version manager) nas dependências do Linux para que não haja conflitos entre os nomes node e nodejs.

No terminal do ambiente Linux digite os comandos:
```
sudo apt-get update
sudo apt-get install build-essential libssl-dev
```
Instalando o NVM:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
```
Pode haver alterações nas versões do NVM, por isso é recomendado verificar na página do [projeto do NVM](https://github.com/creationix/nvm) a versão mais recente.

O comando a seguir exibe as versões mais recentes do node escolha a que melhor se encaixa em seu sistema:
```
nvm ls-remote
```
Agora é só instalar com o comando:
```
nvm install 'versão escolhida'
```

**No Windows:**

Acesse o [site oficial](https://nodejs.org/en/) do Node.js e baixe o instalador.

Para verificar se o Node.js está instalado execute o comando:
```
node --version
```
### Servidor IRC

Um servidor IRC utiliza um protocolo de mesmo nome para realizar
a comunicação entre duas maquinas através de sockets.

 Para rodar o servidor, estando com o terminal na pasta onde está o arquivo
 **irc-server.js** insira o comando:
 ```
 node irc-server.js
 ```
 O servidor indicará que está rodando na porta 3000.

Para acessar o servidor abra outro terminal, e acesse usando a ferramenta telnet
e informe o endereço local da sua maquina e a porta em que o servidor esta rodando:
```
telnet 127.0.0.1 3000
```
### Cliente IRC: Chatzilla

Nesse projeto utilizamos o Chatzilla, um cliente IRC onde temos uma interface amigável para trabalhar com o servidor. 
Esta disponível como extensão do navegador [Mozilla Firefox](https://www.mozilla.org/pt-BR/firefox/new/). Para utilizá-lo, instale a extensão e siga as instruções abaixo: 

Aperte **alt** estando no Mozilla Firefox e vá em: 
```
ferramentas > ChatZilla
```
Após efetuado esses passos vá na aba:  
```
IRC > Join Channel 
```
No campo Network insira o endereço ip local da maquina e a porta que o servidor IRC está sendo executado separados por dois pontos:
```
Network: localhost:3000
```
Caso queira entrar em um canal entre com o nome do canal no campo Channel:
```
Channel: #ircbrasil
```
 Feito isso, clique no botão **join** e o servidor já estará executando, e você receberá uma mensagem de boas-vindas. E já poderá enviar mensagens a quem estiver no canal.

### Servidor de Referencia: ircd-irc2

Para efeitos de referência no desenvolvimento deste projeto, utilizamos o servidor real ircd-irc2 de simples utilização e muito pratico no entendimento dos comandos em geral.

Para utiliza-lo e necessário estar utilizando o ambiente linux, execute os seguintes procedimentos no terminal.

Entre como root:
```
sudo -i
```
Instale o servidor:
```
apt-get install ircd-irc2
```
Execute o comando status para ver qual estado do servidor atualmente:
```
service ircd-irc2 status
```
No lugar de **status** você pode usar as variantes **start** (iniciar servidor), **stop**(parar servidor) e **restart**(reiniciar servidor). No nosso caso queremos iniciar o servidor, logo:
```
service ircd-irc2 start
```
Para desinstalar o servidor use: 
```
dpkg -P ircd-irc2
```
Para verificar se o processo do servidor esta rodando execute o seguinte comando e procure pelo nome do servidor no resultado:
```
ps aux | grep irc
```
Para rodar o servidor insira o comando telnet seguido do ip local da maquina e a porta padrao do protocolo irc:
```
telnet localhost 6667
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
