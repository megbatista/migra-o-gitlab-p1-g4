# Manual do Usuário

## Projeto 1 - Servidor IRC

### Índice

* 1. Apresentação do software
* 2. Utilização do software
  -    2.1 Instalação
* 3. Comandos:
  -    3.1 NICK
  -    3.2 USER
  -    3.3 JOIN
  -    3.4 PRIVMSG
  -    3.5 PART
  -    3.6 KICK
  -    3.7 PING
  -    3.8 ISON
  -    3.9 USERHOST
  -    3.10 QUIT

#### 1. Apresentação do software

   Um servidor IRC permite que diferentes dispositivos se comuniquem em uma rede utilizando o protocolo IRC.
O servidor é responsável por gerenciar o processo de comunicação estabelecendo regras e disponibilizando comandos que podem ser executados pelos computadores em conexão.
   O presente servidor implementa um chat online onde usuários conectados podem interagir em tempo real uns com os outros.


#### 2. Utilização do software

##### 2.1 Instalação
Para a correta execução do servidor é necessária a instalação da plataforma Node.js e para download do projeto no Gitlab é necessário fazer a instalação da ferramenta git.

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
Para instalar o Git use:
```
sudo apt-get install git
```

**No Windows:**

Acesse o [site oficial do Node.js](https://nodejs.org/en/) baixe o instalador e execute-o.
Acesse também o [site oficial do Git](https://git-scm.com/) siga o mesmo procedimento.

Para verificar se o Node.js está instalado execute o comando:
```
node --version
```
Instalada a plataforma Node.js e a ferramenta Git faça o download do projeto disponível no gitlab:
```
git clone https://gitlab.com/sd1-ec-2017-2/p1-g4.git
```
Entre na pasta do servidor e execute o comando:
```
nodejs irc-server.js
```

#### 3. Comandos

##### 3.1 NICK
O comando NICK permite ao usuario atribuir a si um apelido o qual ele sera identificado por toda a duracao da conexao com o servidor. O usuario tem a liberdade de alterar esse apelido quando julgar necessario, com tanto que nao exista alguem usando o apelido informado no servidor.
```
Entrada: NICK <apelido>
Saida: :<username>!@<server> NICK <novo apelido>
```
##### 3.2 USER
O comando USER e necessario no momento do registro da conexao com o servidor, onde e especificado o nome de usuario de quem esta se conectando bem como o seu nome real e algumas outras propriedades de modo como estar invisivel ou nao.
```
Entrada: USER <nome de usuario> <modo> * : <nome real>
```
##### 3.3 JOIN
O comando JOIN é usado para entrar em um canal ou criar um novo canal.
```
join #gyn,#cafe,#cinemais
```
Tambem pode ser usado para sair de todos os canais usando '0' como argumento
```
join 0
```
##### 3.4 PRIVMSG
Enviar mensagem privada para algum usuário (o usuário precisa ter um nick)
    
```
privmsg nick mensagem mensagem mensagem
```
    
Enviar mensagem privada para algum grupo (você precisa estar dentro desse grupo):
    
``` 
privmsg grupo mensagem mensagem mensagem
```
    
* O nome do grupo sempre irá começar com o caractere ```#```, e somente nomes de grupo podem iniciar com esse caractere.

##### 3.5 PART
  O comando PART deve ser utilizado por um usuario que deseja sair dos canais especificados. Esse comando retira o usuario da lista de usuarios ativos de todos os canais especificados como parametros. A mensagem de saida de padrao e desabilitada caso o usuario insira uma mensagem como ultimo parametro do comando.
```
Entrada: PART <lista de canais separados por virgula> <mensagem>
Saida: Part <lista de canais> :<mensagem>
```
##### 3.6 KICK
  O comando KICK permite que usuários sejam banidos de um determinado canal, para usá-lo é necessário o nome do canal, o user de quem será banido e uma mensagem opcional. O comando retornará seu próprio nick, o canal e o user de quem foi banido, informando aos outros usuários do canal 
    ```
    Entrada: KICK #canal 'user de quem será banido'
    Saída:   'seu nick' KICK: #canal 'user de quem será banido' mensagem
    ```
##### 3.7 PING
  O comando PING possibilita a comunicação entre cliente e servidor, para usar esse comando o usuário deve passar seu nick como parâmetro e receberá uma mensagem denominada de PONG com o nome do servidor.
    ```
    Entrada: PING 'nick' 
    Saída:   PONG 'nome do servidor'
    ```
##### 3.8 ISON
  O comando ISON é uma forma fácil de averiguar se determinados nicknames estão online.
  Esta função recebe uma lista de nicknames com espaçamento simples como entrada e retorna outra lista com os nicknames que estiverem online. 
    ```
    Entrada: ISON Gabriel Patrick Gustavo 
    Saída:   Gabriel Gustavo
    ``` 
##### 3.9 USERHOST
O comando USERHOST recebe como parametro uma lista de ate 5 apelidos, cada um separado por um caractere de espaco e entao retorna uma lista de informacoes sobre cada apelido que ele encontrar.
```
Entrada: USERHOST <lista de apelidos>
Saida: <seu nick>:<apelido>=+<nome de usuario>@<nome do host> 
```

##### 3.10 QUIT
  O comando QUIT encerra a conexão cliente/servidor em outras palavras, ele é usado para sair do chat, a única restrição desse comando é o envio de uma mensagem de saída.
    ```
    Entrada: QUIT 'mensagem'
    Saída:   Connection closed
    ``` 