Aplicativo com o objetivo de mostrar uma lista de carros a partir de https://wswork.com.br/cars.json e ao escolher um carro ser possível clicar em eu quero e salvar as informações do carro selecionado e o email do usuário em uma base e dados sqlite. Além disso, a cada 1 minuto uma rotina é realizada fazendo o envio dos dados do banco local para a api enquanto o aplicativo está em segundo plano.

Tecnlogias utilizadas: React Native, Expo, Sqlite

Instalação:

- Instalar as dependencias:

  npm install

- Iniciar a aplicação:

   npx expo start

Explicação:

- Expo: facilitar o desenvolvimento e a configuração inicial do aplicativo, aproveitando suas ferramentas e bibliotecas integradas.

- Foi utlizado o Axios para Requisições HTTP pela sua simplicidade e suporte a promessas, facilitando a interação com a API.

- Utlização do expo-sqlite para tratar de dados do banco local da aplicação.

- expo-task-manager para gerenciar o envio periódico de leads, garantindo que o envio aconteça mesmo quando o aplicativo não estiver em uso ativo.

- react-navigation para o controle de rotas, nessa aplicação foi usada a stack

- A rotina é realziada em src/Task/backgroundTask realizando o get dos dados de sqlite e a delete deles após o envio para a api.

- O tempo de intervalo da rotina pode ser alterado em src/App/index em:  minimumInterval: 60 * 1

Tela de início

![image](https://github.com/gabrielquadro/appCars/assets/61526044/aedc8d99-121a-4a34-966b-4fa93809c086)

Tela de detalhes

![image](https://github.com/gabrielquadro/appCars/assets/61526044/921bc42a-83d0-4156-8d80-fc0be000f66f)


Tarefa sendo executada em segundo plano a cada 1 minuto

![image](https://github.com/gabrielquadro/appCars/assets/61526044/78babf6b-b284-488e-986d-a3974369aa08)
