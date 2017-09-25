# Manual do Usuario

## Projeto 1 - Servidor IRC

1. Apresentacao do software

    Um servidor IRC permite que diferentes computadores se comuniquem em uma rede utilizando o protocolo IRC.
    O servidor e responsavel por gerenciar o processo do comunicacao estabelecendo regras e disponibilizando comandos
    que podem ser executados pelos computadores em conexao.

    O presente servidor implementa um chat online onde usuarios conectados podem interagir em tempo real uns com os outros.

2. Utilizacao do software

    Para a correta execucao do servidor e necessaria a instalacao da plataforma Node.js e para download do projeto no Gitlab
    e necessario fazer a instalacao da ferramenta git.

    No Windows: acesse o [site oficial do Node.js](https://nodejs.org/en/) baixe o instalador e execute-o.
    Acesse tambem o [site oficial do Git](https://git-scm.com/) siga o mesmo procedimento.

    No Linux: execute o seguinte comando para instalar a versao mais recente do Node.js:
    ```
    sudo apt-get install nodejs
    ```
    Para instalar o Git use:
    ```
    sudo apt-get install git
    ```

    Instalada a plataforma Node.js e a ferramenta Git faca o download do projeto disponivel no gitlab:
    ```
    git clone https://gitlab.com/sd1-ec-2017-2/p1-g4.git
    ```
    Entre na pasta do servidor e execute o comando:
    ```
    nodejs irc-server.js
    ```
3. Comandos

    ISON: O comando ISON é uma forma facil de averiguar se determinados nicknames estao online.
    Esta função recebe uma lista de nicknames com espaçamento simples como entrada e retorna 
    outra lista com os nicknames que estiverem online.
    
    ```
    Entrada: ISON Gabriel Patrick Gustavo 
    Saida:   Gabriel Gustavo
    ``` 