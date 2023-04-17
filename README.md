# prj-JavaScript-API
## Este projeto foi desenvolvido para cumprir um desafio. Devido a isto, irei compartilhar o passo-a-passo de como foi desenvolvido.
Primeiro procurei os vídeos que  me auxiliaram em todo o projeto.
Todos vídeos utilizados para criação desse projeto está na referência bibliográfica.
O projeto consiste em consumir uma API e apresentar os dados em uma interface através do JavaScript.
Optei por utilizar os frameworks: vue e boostrap, pelos seguintes motivos:
- através do vue, utilizaremos o recurso do axios para  consumir a API.
- bootstrap foi escolhido para desenvolver a interface e por ele já criar a estrutura inicial do projeto.

Primeiramente instalei o vue através do prompt com seguinte comando:
npm install -g @vue/cli 

Depois criei a estrutura do projeto vue com bootstrap,que contém os arquivos iniciais do projeto, através do comando:
create bootstrap -vue

Após criar a estrutura do projeto:
- abri ele no VS Code
- abri o terminal na raiz do projeto

Realizei a instação do bootstrap através dos comandos no terminal:
npm install bootstrap
npm install @popperjs/core

Criei um arquivo dentro da pasta "src", chamado "bootstrap.js", que serve para importar\exportar o bootstrap.css para ser utilizado no projeto.

Importei o "bootstrap" no arquivo "main.js", que também contém a importação do "vue" e do "App" (App é de fato nossa aplicação, onde tratará o(s) objeto(s) e tornará nossa aplicação visivél para o usuário final).

Depois de importar o "bootstrap", criamos um constante chamado "app" e instâciamos ele,
adicionamos a usabilidade do "bootstrap" na constante e depois montamos a aplicação nele.

Criei a pasta "services" dentro da página raiz do projeto, depois criei o arquivo "api.js"
Abri o terminal e instalei a dependência(axios) do meu projeto, através do comando:
npm i axios --save-dev

No arquivo "api.js", realizei os passos para configurar o axios no projeto:
- importamos o axios 
- criamos uma constate "api" que receberá o objeto com os dados da API através do URL
- exportamos o "api" que poderá ser utilizado em qualquer parte do projeto

Depois importei o "api" dentro do "App.vue" para utilizar e tratar os dados recebidos.

Dentro do "App.vue":
- criei uma constante chamada "user" que receberá um Array de todos objetos (no caso cada objeto será um usuário da api);
- criei outra constante chamada "fetchUsers" que recebe o resultado de todos dados(nome,telefone,idade,...) de cada objeto que contém na api;
- modifiquei o template para que exiba o nome e sobre nome de todos usuários da api na interface;
- criei um butão no template chamado "VIEW" que irá exibir todas as informações escolhidas após clicar nele;
- modifiquei a função do botão "VIEW", agora os dados de todos usuários irão ficar na tela inicial e o VIEW exibirá informações específicas de um único usuário;
- alterei o template novamente para exibir além do nome completo, a data de nascimento e número de celular de cada usuário na tela inicial;
- adicionei no template no formato de card, retirado no site do bootstrap, para exibir os dados desejados dos usuários em formato de cartão apenas para testar formato;
- após a alteração anterior, exibe apenas a informação de somente um usuário em formato de cartão e no meio da tela inicial que contém todos usuários;
- concertei o template para exibir a informação de todos usuários na tela inicial de forma organizada e com formato de cartão;
- alterei a formatação de como era exibida as informações de somente um usuário após clicar em "VIEW", agora ela é exibida separadamente no final  da tela inicial em formato de card;
- Criei um arquivo style.css contendo a formatação do card e importei o css no index.html para ser utilizado no projeto;
- Modifiquei o template novamente para testar o novo desing dos cards ;
- Concertei o teste do desing em card na tela inicial no template;
- Teste para implementar Web Desing Responsivo;
- Modifiquei o formato da data e do telefone;
- Alterei desing do botão ADD;
- Adicionei o ícone de sexo para testar;
- Modifiquei o template para quando botão VIEW é acionado;
- Botão view com modal e inserção " <   VIEW PROFILE    + ";
- Modificação final do desgin do template apos clicar em  "VIEW";

Referências bibliográficas:
- https://www.youtube.com/watch?v=cGFjn40VJ-M
- https://www.youtube.com/watch?v=tW0H5ReNBzo
- https://www.youtube.com/watch?v=PPLW5iFgSEg
- https://www.youtube.com/watch?v=kB5e-gTAl_s
- https://www.youtube.com/watch?v=lzbRNx05S00
- https://www.youtube.com/watch?v=LPFEtLSJrEQ
- https://www.youtube.com/watch?v=agcvY0vfdF8
- https://www.youtube.com/watch?v=GvGYlBYtlAk
