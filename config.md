**Este arquivo tem como objetivo documentar os passos de linha de comando
para configurar projeto similar. Assim o aluno pode reproduzir a configuração
em seu próprio projeto.**

# 1. Criar o repositório do GIT e comandos básicos do  GIT

## 1.1 Somente uma vez no início do projeto

Criar o respositório 
```bash
git init
```

Adiciona o repositório remoto (mudar para o seu repositório de projeto)

```bash
git remote add origin git@github.com:diogosmendonca/pragmapm.git
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
git commit -m "Commit inicial do projeto"
```

Envia as alterações para o repositório remoto. Não precisa ser feito a cada commit, podem ser diversos de uma vez. Idealmente o desenvolvedor não deve deixar o respositório remoto desatualizad por muito tempo.

```bash
git push -u origin master
```


