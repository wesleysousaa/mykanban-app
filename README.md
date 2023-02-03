
# APP My Kanban DashBoard

![aaa](https://user-images.githubusercontent.com/47366440/216109543-4e2ec78c-ff5a-452c-9b20-7cdcde49722f.gif)

## Começando

### Instalação
Clone o repositório e abra na sua IDE

Use o gerenciador de pacotes NPM

Caso dê em react-scripts: command not found after running npm start Digite npm install 

### Informações sobre o APP
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

#### Estilização de componentes
Para essa parte utilizei uma ferramenta que possui diversos componentes estilizados para melhorar a aparência do site (MUI).

### Observações
> Ao invés de StyledComponents optei por CSS Modular.
> 
> Há um warning causado pela funcionalidade de arrastar e soltar componentes, mas o mesmo não causa nenhuma interferência em nenhuma parte do site, e também não é visivel em produção.


## Considerações finais
Espero que gostem do APP!
