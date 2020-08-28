**Este arquivo tem como objetivo documentar os passos de linha de comando
para configurar projeto similar. Assim o aluno pode reproduzir a configuração
em seu próprio projeto.**

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

## 4.3. Instalando e configurando o Cucumber (Documentação e execução de testes de aceitação usando BDD - Behavior Driven Development)

O Cucumber é uma ferramenta muito útil para ligar a documentação dos testes de aceitação com a execução dos mesmos. Desta forma, facilitamos o entendimentos dos testes de aceitação, visto que este costumam ser compartilhados com os stakeholders do projeto, e ainda o tornamos executável sendo documentação viva do projeto. Um tutorial básico sobre o Cucumber pode ser encontrado [neste link](https://cucumber.io/docs/guides/10-minute-tutorial/). Já a documentação da linguagem Gherkin, que é utilizada na documentação, [encontra-se aqui](https://cucumber.io/docs/gherkin/). Os passos abaixo são somente para configurar o projeto inicialmente. A teoria sobre BDD e porque ela é útil são explicados na disciplina de Teste de Software.

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


