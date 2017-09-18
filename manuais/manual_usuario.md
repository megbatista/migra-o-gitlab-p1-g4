# Manual do Usuario

## Projeto 1 - Servidor IRC

1. Apresentação do software

Um servidor IRC permite que diferentes computadores se comuniquem em uma rede utilizando o protocolo IRC.
O servidor e responsável por gerenciar o processo do comunicação estabelecendo regras e disponibilizando comandos
que podem ser executados pelos computadores em conexão.

O presente servidor implementa um chat online onde usuários conectados podem interagir em tempo real uns com os outros.

2. Instruções de comandos

Comando `privmsg`:

Enviar mensagem privada para algum usuário (o usuário precisa ter um nick)
    
```
privmsg nick mensagem mensagem mensagem
```
    
Enviar mensagem privada para algum grupo (você precisa estar dentro desse grupo):
    
``` 
privmsg grupo mensagem mensagem mensagem
```
    
* O nome do grupo sempre irá começar com o caractere ```#```, e somente nomes de grupo podem iniciar com esse caractere.


