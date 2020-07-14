## [Front-end] Projeto de CSC-03: Contador de fluxo de pessoas em um estabelecimento
Projeto front-end para sistema de registro e análise de fluxo de pessoas em um estabelecimento.

### Tecnologias
Projeto desenvolvido em [React](https://reactjs.org) e com as seguintes dependências:
- [Styled-components](https://styled-components.com/)
- [React-Router-DOM](https://reacttraining.com/react-router/)
- [Axios](https://github.com/axios/axios)
- [Material-UI](https://material-ui.com/)
- [React-Vis](https://uber.github.io/react-vis/)

### Estrutura de pastas
```js
- public
- src
  |- pages
    |- Global
    |- Local
  |- sections
    |- Global
    |- Local
  |- services
  |- styles
```

### Sobre o back-end
Back-end desenvolvido em [Node.js](https://nodejs.org/en/) com framework web [express](https://expressjs.com/pt-br/). É necessário ter o [Docker](https://docker.com) instalado em sua máquina.
Mais informações no [repositório](https://github.com/lulis123/csc03BackEnd).

### Iniciando o projeto
Verificar se existe [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/) e [yarn](https://yarnpkg.com/) instalados na sua máquina antes de iniciar o projeto.
```bash
# Clone o repositório front-end
$ git clone https://github.com/italorennan/csc03FrontEnd

# Entre no repositório
$ cd csc03FrontEnd

# Instale as dependências que estão presentes no arquivo 'package.json'
$ npm install

# Clone o repositório back-end
$ git clone https://github.com/lulis123/csc03BackEnd

# Depois de seguir as instruções de 'getting started' do back-end
# Entre no repositório
$ cd csc03BackEnd

# Instale as dependências que estão presentes no arquivo 'package.json'
$ npm install

# Rode o projeto front-end
$ yarn start

# Rode o projeto back-end
$ sudo npm start
```

### Padrões de desenvolvimento do projeto
Criar uma nova branch `git checkout -b new-branch` sempre que for desenvolver uma nova funcionalidade.
> Nunca commitar na branch master!
