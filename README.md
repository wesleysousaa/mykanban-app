
# APP My Kanban DashBoard



## Começando

### Instalação
Clone o repositório e abra na sua IDE

Use o gerenciador de pacotes NPM

### Informações sobre o consumo do APP
#### Hooks Personalizados
> useAuth -> Responsável por prover operações de autenticação, ex: login

> useCards -> Responsável por prover operações envolvendo o card, ex: update

> useChange -> Responsável apenas por prover valores do contexto ChangeContext

#### Contextos
> AuthContext -> Esse contexto tem um token como atributo para que possa ser acessado a qualquer parte do código

> ChangeContext -> Esse contexto armazena um boolean que é atualizado a cada vez que uma nova operação acontece (usado para atualização dinêmica dos componentes)

#### Services
>  -> deleteCard

>  -> getCards

>  -> login

>  -> postCard

>  -> updateCard

#### São elas:
> DB_PASS=t1vO7Q1cJB6B09gQ

> DB_USER=wesleys

#### Outras variáveis de ambiente que a api usa são:
> PORT

> AUTH_USER (corresponde ao login)

> AUTH_PASS (corresponde a senha)

## Considerações finais
Espero que gostem da API!
