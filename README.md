# Projeto 1 - Sistemas Distribuidos 1 - Engenharia de Computação - UFG - Servidor IRC

## Membros

* Gabriel Gomes Cruz da Rocha - gblcr@hotmail.com - Sem cargo definido

* Patrick Dantas Silva Sá Teles - patrickdsilva99@gmail.com - Sem cargo definido

* Vitor Rafael Gonçalves Rodrigues - vitorafaelgr@gmail.com - Desenvolvedor

* Meg Batista Alves - meg1489@hotmail.com - Desenvolvedor

* Gustavo Vinicius Taveira Lima - gustavo_vinicius_taveira@hotmail.com - Desenvolvedor

## Documentacao

Para a correta execução do servidor é necessária a instalação do Node.js.

No terminal do ambiente Linux digite o seguinte comando:
```
sudo apt-get install nodejs
```
Caso esteja usando o Windows,  acesse o [site oficial](https://nodejs.org/en/) do Node.js e baixe o instalador.

Para verificar se o Node.js está instalado, execute o comando:
```
node --version
```
### Servidor IRC

Um servidor IRC utiliza um protocolo de mesmo nome para realizar
 a comunicação entre duas máquinas através de sockets.

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