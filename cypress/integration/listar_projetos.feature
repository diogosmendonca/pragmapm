# language: pt
Funcionalidade: Listagem de Projetos

    Apresenta uma lista de projetos juntamente com seu andamento 
    na unidade selecionada, indice de desempenho de custo (IDC) e prazo (IDP)
    (conforme protótipo lista de projetos). Possibilita o acesso as ações
    de inclusão e alteração de projetos e permite a exclusão de projetos.
    

    Contexto: 
        Dado que temos projetos cadastrados
            | Projeto     |  Unidade  |  UnAtual | UnTotal | IDC | IDP |
            | Projeto X   |  Semana   |  2       |  4      | 0.8 | 0.9 |
            | Projeto Y   |  Mês      |  4       |  6      | 1.3 | 1.0 |
            | Projeto Z   |  Semana   |  3       |  10     | 1.0 | 1.0 |

    Cenário: Exibir Listagem de Projetos
        Quando a tela de listagem de projetos é acessada
        Então os projetos são exibidos

    Cenário: Novo projeto
        Dado que é exibida a tela de listagem de projetos
        Quando clico no botão novo projeto
        Então a tela de cadastramento de novo projeto é exibida

    Cenário: Acessar projeto
        Dado que é exibida a tela de listagem de projetos
        Quando clico em um projeto
        Então a tela do projeto é exibida

    Cenário: Excluir projeto
        Dado que é exibida a tela de listagem de projetos
        Quando clico no ícone de excluir um projeto
           E confirmo a exclusão
        Então que é exibida a tela de listagem de projetos
           E o projeto excluído não está nela




