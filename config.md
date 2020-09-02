# Montando a Stack de Desenvolvimento e Testes
Este arquivo tem como objetivo documentar o passo-a-passo para configurar a stack (pilha ou conjunto de tecnologias) de desenvolvimento e testes para um projeto similar. 

Assim o aluno pode reproduzir a configuração em seu próprio projeto.

# 1. Criar o repositório do GIT e comandos básicos do  GIT

Precisaremos de um controle de versão para o projeto. O software de controle de versão mais popular hoje em dia é o [git](https://git-scm.com/). Não confundir com [Github](https://github.com/), que é somente um repositório remoto. 

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

Como existem conjuntos de componentes web já responsivos é comum começarmos o desenvolvimento pela seleção de um conjunto destes componentes para estilizar e dar responsividade a aplicação, acelerando assim o desenvolvimento. Os conjuntos de componentes mais comuns encontrados em aplicações web são listados abaixo. Você pode [comparar a popularidade deles no google trends](https://trends.google.com.br/trends/explore?geo=BR&q=Bootstrap,Material%20Design) ou [nos tags do stackoverflow](http://sotagtrends.com/).

- [Bootstrap](https://getbootstrap.com/) (feito pelo Twitter)
- [Material Design](https://material.io/) (feito pelo Google)

Estes componentes podem ser utilizados diretamente importanto o seu CSS e javascript no HTML e utilizando algumas referências a classes e eventos. Contudo, veremos na próxima seção que a abordagem de empacotamento deles em componentes ECMAScript é mais simples e prático de trabalhar. 

## 4.7 Trabalhando com Componentes em Javascript

### 4.1 Introdução - Entendendo o cenário e escolhendo um famework/biblioteca
Componentes são elementos independetes que visam encancapsular alguma parte do software, provendo uma interface externa aos seus consumidores e escondendo todo o restante no seu interior. Um dos principais objetivos de componentização em software é o reuso dos componentes, seja em diversas partes da mesma aplicação ou entre aplicações. Botões, tabelas, menus, entre outros elementos comumente encontrados em front-end de aplicações web são casos típicos de componentes, onde queremos adicionar comportamento a eles, provendo uma implementação e externalizando somente o que for necessário.

Você pode construir sua própria infraestrutura para encapsular componentes na sua aplicação. O elemento clássico para fazer isto são Classes e objetos. Contudo, [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) (padronizado como ECMAScript) em suas versões mais antigas suportadas (versão 5.1) não possuem classes e objetos, mas somente funções. Tais versões são as normalmente suportadas pelos Browsers de internet. Conduto a especificação do ECMAScript evoluiu bastante desde sua versão 6 (ECMAScript 6 ou ECMAScript 2015) adicionando elementos como Classes a linguagem. Isto fez com que o Javascript entrasse oficialmente para o paradigma orientado a objeto, dando novos rumos a linguagem, facilitando a sua adoção por desenvolvedores que conhecem componentização e sabem o seu valor. Atualmente o ECMASCript tem lançado versões novas anualmente, contudo a mais emblemática foi a versão 6, por incluir uma série de recursos não existentes anteriormente na linguagem, sendo a versão atualmente mais adotada.

Como alguns browsers aceitam o ECMScript6 nativamente (é o caso do Google Chrome) e outros não, a solução encontrada por muitos desenvolvedores para programar orientado a objeto e executar seu código no navegador é a Compilação (alguns falam Transpilação apesar da [diferença ser pequena](https://www.stevefenton.co.uk/2012/11/compiling-vs-transpiling/)) do código de ECMAScript6+ para ECMAScript 5.1. Existem algumas ferramentas que fazem isto no mercado, sendo o [Babel](https://babeljs.io/) a mais conhecida.

Agora que sabemos as questões envolvidas com Componentes em ES6 (ECMAScript 6), vamos as ferramentas que nos ajudam a gerenciá-los. Existem diversos frameworks e bibliotecas Javascript com este propósito. Listo abaixo as mais conhecidas. Vocês podem acompanhar [a popularidade delas no google trends](https://trends.google.com.br/trends/explore?geo=BR&q=angular,react,vue,backbone,ember) ou [nos tags do stackoverflow](http://sotagtrends.com/). Atualmente a mais popular é o React, sendo a ferramenta que vou adotar daqui em diante.

- [React](https://pt-br.reactjs.org/) (feito pelo Facebook).
- [Angular](https://angular.io/) (feito pelo Google).
- [Vue.js](https://vuejs.org/)

Menção horosa para o [Polymer Project](https://www.polymer-project.org/), [Backbone](https://backbonejs.org/) e [Ember](https://emberjs.com/).

Reparem todos estes frameworks são para desenvolvimento web-first, ou seja, priorizando o desenvolvimento web como base e utilizando empacotamento da aplicação para dispositivos móveis em uma estratégia conhecida como aplicativos híbridos  (aplicativo baseado em WebView - um browser encapsulado em um aplicativo adicionado de capacidades mobile). Este tipo de aplicação funciona bem em mobile na maior parte das vezes, quando não é necessária alta performance de renderização ou uso intensivo de funções nativas mobile. Se você tiver requisitos como estes na sua aplicação, sendo o foco principal o aplicativo nativo e não o web, você pode preferir utilizar frameworks que focam em compilação para código nativo mobile, como o [React Native](https://reactnative.dev/) e o [Flutter](https://flutter.dev/). Devo alertá-los que o desenvolvimento nestas plataformas foca em mobile nativo prioritariamente, utilizando os componentes mobile como abstração principal e não os componentes web como HTML, CSS e JS. A compilação deles para web não costuma ser o foco e pode gerar problemas (eu testei o React Native e não ficou legal, o Flutter não testei e não tenho como afirmar - tem que aprender Dart para programar no Flutter). A questão aqui é que utilizando estes frameworks (onde o foco principal é o mobile) você pode precisar ter dois códigos para a mesma aplicação, um web e outro mobile. O que é muito ruim, podendo dobrar o esforço de desenvolvimento e manutenção do front-end do software. Utilizando os frameworks web com encapsulamento para mobile seu código será único (sem duplicação). Como o foco aqui é web seguiremos com o React e mostraremos como encapsulá-lo para mobile posteriormente. 

### 4.2 Instalando e configurando o React

Apesar do site do React dizer que você não precisa de um toolchain (cadeia de ferramentas) para fazer desenvolvimento em React, na verdade é melhor ter uma, pois sem ela seu desenvolvimento será mais lento. Quando você cria um projeto React do zero, pelo comando abaixo, ele já configura para você o Babel para compilação do ES6 e o Webpack para comprimir e gerar os arquivos distribuíves da aplicação (a versão de produção). Além disto, o React usa como padrão o gerenciador de pacotes Yarn (além do NPM que também é usado). Os comandos do React em seu no manual usam o Yarn, ou seja, se você não usá-lo terá que encontrar comandos similares na web. No final das contas é melhor usar o toolchain do React. Para inicializar um projeto do zero com o React rode o comando abaixo:

```bash
npx create-react-app <nome-da-pasta-da-aplicação>
```

Reparem, se você já tem uma aplicação na pasta referenciada o comando provavelmente não irá funcionar. Para Instalar o React em uma aplicação existente juto com o seu toolchain siga as instruções abaixo. 

1. Rode o comando `npx create-react-app` em uma outra pasta vazia.
2. Instale as dependências do seu projeto com o Yarn, no nosso caso: `yarn add --dev cucumber cypress cypress-cucumber-preprocessor`.
3. Copie as pasta e arquivos adicionais do seu projeto para a nova pasta. No nosso caso copie as pastas `cypress` e `docs` do seu projeto para a nova pasta, assim como os arquivos `config.md`, `cypress.json` e `cucumber.js`. **Não** copie o arquivo `package-lock.json` e a pasta `node_modules`, o primeiro não será usado mais no projeto enquanto o segundo será recriado pelo `Yarn` da maneira apropriada.
4. Faça o merge manual dos arquivos `package.json` e `.gitignore` na nova pasta criada. Você pode usar alguma ferramenta de merge para auxiliá-lo, caso seja necessário.
5. Apague o diretório `.git` da pasta nova e copie o diretório `.git` da antiga para a nova.
6. Faça um commit e push para registrar a mudança.

Repare após a inclusão do React não precisamos mais do `lite-server` para rodar o projeto. Então o script dele no `package.json` pode ser apagado. Devio a mudança para o React a aplicação e os testes precisarão de ajustes. Veremos isto melhor durante o curso. O React vem com alguns exemplos iniciais. Você pode rodar ele pelo comando abaixo. Se quiser fazer ajustes na aplicação o ponto inicial da aplicação é o arquivo `src/App.js` referenciado no `src/index.js`. 

```bash
yarn start
```

## 4.8 Empacotando e distribuindo (web e mobile)

O conceito fundamental para constuir uma aplicação web que será encapsulada para mobile é o [Single-Page Application (SPA)](https://en.wikipedia.org/wiki/Single-page_application#:~:text=From%20Wikipedia%2C%20the%20free%20encyclopedia,browser%20loading%20entire%20new%20pages.). Uma SPA é uma aplicação web com somente uma página, ou seja, você tem um ponto de entrada na sua aplicação e todo o restante é controlado por Javascript. Isto diferem do modelo mais antigo de applicação web onde existem diversas URLs e cada uma renderiza uma página diferente. Como veremos mais adiante, as SPA possuem diversas URLs, mas o roteamento delas são controlados por Javascript e você precisa entrar necessariamente pelo único ponto de entrada da aplicação (como se fosse o seu Main, mas é o seu Single-Page ou root da aplicação). 

O React já trabalha neste modelo e como utilizaremos ele não teremos problema quanto a isto. Este entry-point no React costuma ser o arquivo index.js.

A necessidade de termos um SPA para aplicações que serão encapsuladas para mobile é que como estas rodarão em browser headless (sem cabeçalho, barra de endereço, etc - fingindo que não é um browser), o usuário acessa somente uma URL inicialmente e o restante é controlado pela própria aplicação, ou seja, via Javascript.

A maineira mais fácil de encapsular uma aplicação web para distribuição hoje em dia é construir uma [Progressive Web App (PWA)](https://web.dev/what-are-pwas/). As PWAs são aplicações web com capacidade de processamento de eventos em background, cache offline, push notifications, entre outras coisas. Elas visam utilizar as [APIs disponíveis no navegador](https://whatwebcando.today/) no lugar de funcionalidades nativas mobile, proporcionando assim uma experiência mobile encapsulada em um navegador. A diferença disto para um app encapsulado em WebView é que o WebView tem menos capacidades (APIs) do que um navegador completo. Se o desenvolvedor seguir os manuais de desenvolvimento, [provendo os recursos necessários para a aplicação ser reconhecida como uma PWA](https://web.dev/install-criteria/), o próprio navegador oferece a instalação do app quando ele é acessado. Além disto, utilizando [Trusted Web Activities](https://developers.google.com/web/android/trusted-web-activity) (TWA - Chrome dentro de um App Android) você consegue acesso total as APIs web suportadas pelo chrome em um app android. Permitindo o deploy de todas as funcionalidades do chorme dentro de um app na Play Store. Se você quiser trabalhar com iOS o PWA roda dentro do Safari, contudo o deploy na Apple Store pode ser mais complicado. 

Vamos adotar no curso a abordagem de PWA. Para tornar uma aplicação React um PWA é bem simples. Basta trocar no `index.js` a linha `serviceWorker.unregister()` para `serviceWorker.register()`. Lembrando, que segundo as instruções do React para PWA a aplicação somente funciona como PWS no modo de produção e vem com o cache offline desabilitado como padrão. Mesmo assim, fazendo a mudança acima e rodando os comandos abaixo você poderá ver sua aplicação no navegador e ele exibirá o botão de instalação. 

Instale o servidor local chamado serve
```bash
yarn global add serve
```

Compile o código para produção e inicie o servidor.
```bash
yarn build
serve -s build
```

Veremos mais para frente como trabalhar melhor com PWAs, incluindo o cache disponibilizado pelos Service Workers.

Caso a abordagem PWA não atenda, você pode recorrer a aplicações híbridas (compiladas para mais de uma plataforma). Contudo elas serão baseadas em WebView e não devem ter acesso a algumas APIs do navegador. As ferramentas mais comuns para aplicações híbridas são:

- [Cordova](https://cordova.apache.org/) (Apache - open source - Javascript)
- [PhoneGap](https://phonegap.com/) (Baseado no Cordova - Adobe - Descontinuado)
- [Ionic](https://ionicframework.com/) (Baseado no Cordova - Javascript) e [Capacitor](https://capacitorjs.com/) (próprio da Ionic - baseado em Android Studio e Xcode).
- [Xamarin](https://dotnet.microsoft.com/apps/xamarin) - (Microsoft - C#)
- [Flutter](https://flutter.dev/) (Google - Dart)
- [React Native](https://reactnative.dev/) (Facebook - Javascript)


## 4.9 Testes de Unidade

## 4.10 Testes de Integração

## 4.11 Tipagem Estática

## 4.12 Documentação do código e API Web

## 4.13 Análise Estática

## 4.14 Containers, CI e DevOps