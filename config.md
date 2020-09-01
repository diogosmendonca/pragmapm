# Montando a Stack de Desenvolvimento e Testes
Este arquivo tem como objetivo documentar o passo-a-passo para configurar a stack (pilha ou conjunto de tecnologias) de desenvolvimento e testes para um projeto similar. 

Assim o aluno pode reproduzir a configuração em seu próprio projeto.

# 1. Criar o repositório do GIT e comandos básicos do  GIT

## 1.1 Somente uma vez no início do projeto

Criar o respositório 
```bash
git init
```

Adiciona o repositório remoto (mudar para o seu repositório de projeto). No caso o deste projeto é o https://github.com/diogosmendonca/pragmapm.git. 

```bash
git remote add origin <endereço_do_arquivo_.git_do_repositório_remoto>
```

## 1.1 Sempre que completar uma alteração adicionar ela ao repositório

Ver o status (arquivos modificados)

```bash
git status
```

Adicionar os arquivos para serem commitados. Utilizar o "." para todos os arquivos, ou, incluir somente os arquivos e pastas que se quer registrar (commit) dada a alteração.

```bash
git add .
```

Realizar o commit (registro) dos arquivos e incluir uma mensagem informativa sobre o que é esta alteração.

```bash
git commit -m "<Sua msg de commit>"
```

Envia as alterações para o repositório remoto. Não precisa ser feito a cada commit, podem ser diversos de uma vez. Idealmente o desenvolvedor não deve deixar o respositório remoto desatualizad por muito tempo.

```bash
git push -u origin master
```


# 2. Separando documentação e código fonte

Criar duas pastas separadas: docs para documentos e src para código-fonte.

```bash
mkdir docs
mkdir src
```

# 3. Documentação

A documentação criada neste projeto segue listada abaixo juntamente com as ferramentas utilizadas. A forma como elas foram construídas são abordadas nos manuais de cada ferramenta. O conhecimento necessário para construir a documentação é ministrada nas disciplinas de Engenharia de Requisitos, Análise e Projeto de Sistemas e Teste de Software. 

- [Protótipos de interface](https://github.com/diogosmendonca/pragmapm/blob/master/docs/Prototipos.pdf) - Criados com [Balsamiq Mockups](https://balsamiq.com/wireframes/)
- [Diagrama de Classes de Domínio](https://github.com/diogosmendonca/pragmapm/blob/master/docs/Class%20Diagram%20Valor%20Agregado.png) - Criados com o Draw.io
- Casos de teste de aceitação documentados com a linguagem [Gherkin](https://cucumber.io/docs/gherkin/). 

A documentação de testes linkada com os scripts de teste executaveis (casos de aceitação) é excepcionalmente localizada na pasta src e não na docs.

# 4. Código-fonte e instalação de bibliotecas (pacotes) 

O código-fonte da aplicação foi desenvolvida utilizando plataforma web em javascript. Seus pacotes e biblotecas são gerenciados pelo [NPM](https://www.npmjs.com/). Esta seção mostra como configurar um projeto similar nesta plataforma.

## 4.1. Inicializar um projeto

O primeiro passo é inicializar o projeto. Repare, para conseguir fazer isto você precisa ter o [Node.js](https://nodejs.org/) (ambiente de execução Javascript) instalado na máquina local. Neste passo você precisará fornecer informações gerais do projeto.

```bash
npm init
```
Após a execução deste comando o arquivo package.json será criado. Nele ficam as configurações dos pacotes do seu projeto.

## 4.2. Instalando dependências (pacotes)

Para adicionar a dependência de pacote ao seu projeto (e consequentemente ao package.json) utilize o comando abaixo:

```bash
npm install <nome_do_pacote>
```

Após rodar este comando, os arquivos de bibliotecas da sua aplicação serão colocados no diretório node_modules. Não esqueça de incluir esta pasta (node_modules) no arquivo .gitignore (crie um arquivo com este nome na raiz do projeto) do seu projeto para que ela não seja versionada, uma vez que podemos sempre reconstruir esta pasta utilizando o comando npm install do gerenciador de pacotes. Após criar o .gitignore basta incluir uma linha nele com o nome da pasta node_modules.

Repare que existem algumas variações/parâmetros no comando npm install que fazem toda a diferença na forma de instalação dos pacotes. Vamos a elas. 

**Variações:**

### 4.2.1 Instalando todas as dependências de um projeto

Se você não passar nenhum parâmetro para o npm install ele irá instalar todas as dependências que estão listadas no seu package.json. Esta é uma forma muito útil de instalar as dependências quando você baixa um código-fonte do github por exemplo. 

```bash
npm install
```

### 4.2.2 Instalando dependências globais

Dendências globais, como o próprio nome diz, não são do seu projeto, mas sim ferramentas que você utilizará durante o desenvolvimento. Elas não constarão no package.json e não serão incluídas na pasta node_modules do seu projeto. Para instalar uma dependência global utilize o parâmetro -g conforme mostrado abaixo.

```bash
npm install -g <nome_do_pacote>
```

### 4.2.2 Instalando dependências de desenvolvimento

As dependências do npm são instaladas como padrão com a configuração de dependência de tempo de execução, ou seja, seu projeto precisa delas durante a execução do software. Muitas vezes precisamos de pacotes que são necessários somente durante o desenvolvimento. Por exemplo pacotes para executar testes. Para instalar uma dependência somente de desenvolvimento utilize o parâmentro --save-dev conforme mostrado abaixo.

```bash
npm install <nome_do_pacote> --save-dev
```

## 4.3. Rodando uma aplicação web simples com lite-server

O lite-server é um servidor web local que tem como propósito suportar o desenvolvimento de aplicações simples. Ele suporta o reload dinâmico ao alterar um arquivo. Para instalação execute o comando abaixo.

```bash
npm install lite-server --save-dev
```

Após instalar a dependência você pode instalar um script no package.json para rodar o servidor de desenvolvimento. Adicione na seção `scrpts` do `package.json` o trecho abaixo. Repare, nele há uma configuração para indicar que o código da aplicação fica localizada na pasta `src`. Caso na sua aplicação seja diferente ajuste conforme necessário.

```JSON
    "dev": "lite-server --baseDir=\"src\""
```

Para rodar a aplicação execute
```bash
npm run dev
```

## 4.4. Instalando e configurando o Cucumber (Documentação e execução de testes de aceitação usando BDD - Behavior Driven Development)

O Cucumber é uma ferramenta muito útil para ligar a documentação dos testes de aceitação com a execução deles. Desta forma, facilitamos o entendimento dos testes de aceitação, visto que este costumam ser compartilhados com os stakeholders do projeto, e ainda o tornamos executável sendo documentação viva do projeto. Um tutorial básico sobre o Cucumber pode ser encontrado [neste link](https://cucumber.io/docs/guides/10-minute-tutorial/). Já a documentação da linguagem Gherkin, que é utilizada na documentação, [encontra-se aqui](https://cucumber.io/docs/gherkin/). Os passos abaixo são somente para configurar o projeto inicialmente. A teoria sobre BDD e porque ela é útil são explicados na disciplina de Teste de Software.

Instale a dependência do Cucumber como somente desenvolvimento.

```bash
npm install cucumber --save-dev
```

Criar a estrutura de pastas para as especificações e implementações dos testes.

```bash
mkdir features
mkdir features\step_definitions
```

Crie um arquivo chamado `cucumber.js` na raiz do projeto e inclua o conteúdo abaixo nele.

```javascript
module.exports = {
  default: `--format-options '{"snippetInterface": "synchronous"}'`
}
```

Configure o script de execução no `package.json`. Esta configuração fica na seção `scripts` do arquivo. Basta ter uma linha igual a que segue abaixo nesta seção do arquivo. Não esqueça de colocar a virgurla na linha anterior para não quebrar a sintaxe do JSON caso vá somente incluir esta linha. 

Incluir na seção `scripts` do `package.json`:
```JSON
"acc_test": "cucumber-js"
```

Verifique a instalação ao executar os testes de aceitação com o comando

```bash
npm run acc_test
```

## 4.5. Instalando Cypress e integrando ele com o Cucumber (Testes de Aceitação Web Automatizados)

O Cypress é uma engine de execução de testes End-to-End (ou seja, testes de sistema ou aceitação) para aplicações web. Ele permite a programação do acesso aos elementos do HTML e automatiza sua exeução, sendo possível visualizar os testes em execução e registrando o seu histórico. É uma ferramenta muito útil e atualmente tem se mostrado mais fácil de usar e com um suporte melhor que o Selenium (ferramenta similar com o mesmo propósito). Contudo, a escrita dos cenários de teste usando o Gherkin e o uso do Cucumber para ligá-los aos testes automatizados ainda se faz necessária. O Cypress servirá como engine para execução dos testes no browser, não servido como especificação de alto nível destes.

Para instalação do Cypress e sua integração com o Cucumber executar os comandos abaixo:

```bash
npm install cypress cypress-cucumber-preprocessor --save-dev 
```

Devido ao uso do Cypress serão necessárias alterações na estrutura de pastas do projeto. Ao rodar o Cypres pela primeira vez ele criará uma pasta chamada cypress com a estrutura de diretórios padrão, necessária para ele rodar. Para criá-la execute:

```bash
node_modules\.bin\cypress open
```
Uma outra forma de rodar o mesmo comando é com o comando abaixo. Ele abre o browser para exibição da execução dos testes de forma interativa. 

```bash
npx cypress open
```

Se quiser rodar os testes em "modo batch" (em lote), execute o comando abaixo. Ele executa os testes e gera prints das tels e vídeos das execuções. Salvando nas pastas `cypress/screenshots` e `cypress/videos`. Não esqueça de incluir estas pastas no `.gitignore` se for rodar o modo batch.

```bash
npx cypress run
```

Para integrar o Cypress e cucumber algunas alterações são necessárias:

Adicione a seguinte configuração ao package.json do projeto. 

```JSON
"cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true
  }
```

Adicione o seguinte código ao `cypress/plugins/intex.js`. Isto ativa o plugin do cucumber-preprocessor no cypress.

```Javascript
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}

```

Configure no `cypress.json` a extensão .feature como arquivos de testes e o endereço da aplicação.

```JSON
{
    "testFiles": "**/*.feature",
    "baseUrl": "http://localhost:3000/"
}
```

Mova seus arquivos `.feature` do diretório `/features` para `/cypress/integration`. Este será o novo diretório para features. Seus steps definitions podem ser colocados em subpastas com os nomes das features. Por exemplo, se você tem um arquivo `cypress/integration/listar_projetos.feature` seus setepdefs ficam em `cypress/integragion/listar_projeto/`. Os stepdefs em comum ficam na pasta `cypress/integration/common/`. Você pode apagar agora o diretório `features` ele não será mais necessário. Se o cypress tiver gerado arquivos de exemplo na pasta `integration` você pode apagá-los assim como os arquivos gerados na pasta `fixtures`. 

O comando de script `acc_test` definido no `packege.json` anteriormente também não será mais necessário para rodar os testes de aceitação, visto que utilizaremos o Cypress. Ele pode ser substituído pelo `npx cypress run` ou `npx cypress open` segundo a preferência do desenvolvedor.

Para maiores informações sobre o Cypress recorra a [documentação dele](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell). Para informações sobre o plugin de integração do cypress com cucumber a documentação pode ser encontrada [aqui](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor).


## 4.6. Layout e Responsividade

Hoje em dia é comum termos que desenvolver aplicações web para diversas resoluções de telas e dispositivos. Isto é resolvido nativamente nas tecnologias web pela característica de responsividade, ou seja, a aplicação ela se ajusta dependendo do tamanho do display. Podemos implementar a responsividade através de [Media Query](https://www.w3schools.com/css/css_rwd_mediaqueries.asp) diretamente no CSS, mas isto costuma dar bastante trabalho sendo desaconcelhavel. 

Como existem conjuntos de componentes web já responsivos é comum começarmos o desenvolvimento pela seleção de um conjunto destes componentes para estilizar e dar responsividade a aplicação, acelerando assim o desenvolvimento. Os conjuntos de componentes mais comuns encontrados em aplicações web são listados abaixo. Você pode [comparar a popularidade deles no google trends](https://trends.google.com.br/trends/explore?geo=BR&q=Bootstrap,Material%20Design).

- [Bootstrap](https://getbootstrap.com/) (feito pelo Twitter)
- [Material Design](https://material.io/) (feito pelo Google)

Estes componentes podem ser utilizados diretamente importanto o seu CSS e javascript no HTML e utilizando algumas referências a classes e eventos. Contudo, veremos na próxima seção que a abordagem de empacotamento deles em componentes ECMAScript é mais simples e prático de trabalhar. 

## 4.7 Trabalhando com Componentes em Javascript

### 4.1 Introdução - Entendendo o cenário e escolhendo um famework/biblioteca
Componentes são elementos independetes que visam encancapsular alguma parte do software, provendo uma interface externa aos seus consumidores e escondendo todo o restante no seu interior. Um dos principais objetivos de componentização em software é o reuso dos componentes, seja em diversas partes da mesma aplicação ou entre aplicações. Botões, tabelas, menus, entre outros elementos comumente encontrados em front-end de aplicações web são casos típicos de componentes, onde queremos adicionar comportamento a eles, provendo uma implementação e externalizando somente o que for necessário.

Você pode construir sua própria infraestrutura para encapsular componentes na sua aplicação. O elemento clássico para fazer isto são Classes e objetos. Contudo, [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) (padronizado como ECMAScript) em suas versões mais antigas suportadas (versão 5.1) não possuem classes e objetos, mas somente funções. Tais versões são as suportadas normalmente pelos Browsers de internet. Conduto a especificação do ECMAScript evoluiu bastante desde sua versão 6 (ECMAScript 6 ou ECMAScript 2015) adicionando elementos como Classes a linguagem. Isto fez com que o Javascript entrasse oficialmente para o paradigma orientado a objeto, dando novos rumos a linguage, incluindo facilitando a sua adoção por desenvolvedores que conhecem componentização e sabem o seu valor. Atualmente o ECMASCript tem lançado versões novas anualmente, contudo a mais emblemática foi a versão 6 por incluir uma série de recursos não existentes anteriormente na linguagem, sendo a versão atualmente mais adotada.

Como alguns browsers aceitam o ECMScript6 nativamente (é o caso do Google Chrome) e outros não, a solução encontrada por muitos desenvolvedores para programar orientado a objeto e executar seu código no navegador é a Compilação (alguns falam Transpilação apesar da [diferença ser pequena](https://www.stevefenton.co.uk/2012/11/compiling-vs-transpiling/)) do código de ECMAScript6+ para ECMAScript 5.1. Existem algumas ferramentas que fazem isto no mercado, sendo a mais conhecida o [Babel](https://babeljs.io/). 

Agora que sabemos as questões envolvidas com Componentes em ES6 (ECMAScript 6), vamos as ferramentas que nos ajudam a gerenciá-los. Existem diversos frameworks e bibliotecas Javascript para este propósito. Listo abaixo as mais conhecidas. Vocês podem acompanhar [a popularidade delas no google trends](https://trends.google.com.br/trends/explore?geo=BR&q=angular,react,vue,backbone,ember). Atualmente a mais popular é o React, sendo a que vou adotar daqui em diante.

- [React](https://pt-br.reactjs.org/) (feito pelo Facebook).
- [Angular](https://angular.io/) (feito pelo Google).
- [Vue.js](https://vuejs.org/)

Menção horosa para o [Backbone](https://backbonejs.org/) e [Ember](https://emberjs.com/).

Reparem todos estes frameworks são para desenvolvimento Web-first, ou seja, priorizando o desenvolvimento web como base e utilizando empacotamento deles para dispositivos móveis (aplicativo baseado em webview - como se fosse um browser encapsulado em um aplicativo). Isto resolve bem na maior parte das vezes quando não é necessária muita performance de renderização ou muito intensivo de funções nativas mobile. Se você precisa deste tipo de desenvolvimento, onde o foco principal é o aplicativo nativo, e não a web, você pode preferir utilizar frameworks que focam nisto (native) como o [React Native](https://reactnative.dev/) e o [Flutter](https://flutter.dev/). Devo alertá-los que o desenvolvimento nestas plataformas foca muito em mobile, utilizando os componentes mobile como abstração principal e não os web como HTML, CSS e JS. A compilação deles para web não costuma ser o foco e pode gerar problemas (eu testei o React Native e não ficou legal, o Flutter não testei e não tenho como afirmar). A questão aqui é que utilizando estes frameworks (onde o foco principal é o mobile) você pode precisar ter dois códigos para a mesma aplicação, um web e outro mobile. O que é muito ruim, dobrando o esforço de desenvolvimento e manutenção do software no front-end. Utilizando os frameworks web com encapsulamento para mobile seu código será único (sem duplicação). Como o foco aqui é Web seguiremos com o React e mostraremos como encapsulá-lo para mobile posteriormente. 

### 4.2 Instalando e configurando o React



## 4.8 Empacotando e distribuindo

## 4.9 Testes de Unidade

## 4.10 Testes de Integração

## 4.11 Tipagem Estática
