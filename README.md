# Projeto 1 - Sistemas Distribuidos 1 - Engenharia de Computacao - UFG - Servidor IRC

## Membros

* Gabriel Gomes Cruz da Rocha - gblcr@hotmail.com - Sem cargo definido

* Patrick Dantas Silva Sá Teles - patrickdsilva99@gmail.com - Sem cargo definido

* Vitor Rafael Gonçalves Rodrigues - vitorafaelgr@gmail.com - Desenvolvedor

* Meg Batista Alves - meg1489@hotmail.com - Desenvolvedor

* Gustavo Vinicius Taveira Lima - gustavo_vinicius_taveira@hotmail.com - Desenvolvedor

## Documentacao

Para a correta execucao do servidor e necessaria a instalacao do Node.js.

No terminal do ambiente Linux digite o seguinte comando:
```
sudo apt-get install nodejs
```
Caso esteja usando o Windows,  acesse o [site oficial](https://nodejs.org/en/) do Node.js e baixe o instalador.

Para verificar se o Node.js esta instalado execute o comando:
```
node --version
```
### Servidor IRC

Um servidor IRC utiliza um protocolo de mesmo nome para realizar
 a comunicacao entre duas maquinas atraves de sockets.

Para esta implementacao de servidor IRC estamos utilizando a orientacao objetos fornecida
pelos novos recursos do ECMAScript 6 (Javascript).

Acesse o [site de referencia](https://medium.com/@matheusml/o-guia-do-es6-tudo-que-voc%C3%AA-precisa-saber-8c287876325f) pra verificar as novas funcionalidades. 


 Para rodar o servidor, estando com o terminal na pasta onde esta o arquivo
 **irc-server.js** insira o comando:
 ```
 npm run babel
 ```
 O servidor indicara que estara rodando na porta padrao do protocolo IRC: 6667.

Caso nao tenha o Node Package Manager instalado execute o comando:
```
apt-get install npm
```

Para acessar o servidor abra outro terminal, e acesse usando a ferramenta telnet
e informe o endereco local da sua maquina e a porta em que o servidor esta rodando:
```
telnet 127.0.0.1 6667
```
