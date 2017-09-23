function privmsg(args, canais, socket, clients)
{
     if(!args[1])
     {
         socket.write("ERRO: nick/canal não fornecido!\n");
         return;
     }
     //nick não pode comecar com #
     //verifica também se args[1] é um nick existente
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
    //nome de canal precisa começar com #
    //verifica também se args[1] está na listaDeCanais
    else if(canais[args[1]])
    {       
        //agora verifica se o socket, ou seja, quem digitou o comando PRIVMSG, está no canal para o qual ela está tentando mandar a PRIVMSG. Se não estiver, a mensagem não será enviada. Primeiro verifica se o socket tem a lista de canais entrados, e se tiver, verifica se o canal args[1] está nessa lista.
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
    else
    {
        socket.write("ERRO: nick/canal não encontrado!\n");
        return;
    }
} 

module.exports = privmsg;
