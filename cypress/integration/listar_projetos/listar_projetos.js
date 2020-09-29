import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('que temos projetos cadastrados', async function (projetos) {
    this.projetos = projetos.hashes();
    var i = 0;

    //aqui deveria incluir os dados em um banco de dados de teste.
    for(let p of this.projetos){
        
        let p_cast = {
            ...p,
            id: parseInt(p.id),
            idc: parseFloat(p.idc),
            idp: parseFloat(p.idp),
            unidadeAtual: parseInt(p.unidadeAtual),
            unidadesTotais: parseInt(p.unidadesTotais)
        }
        this.projetos[i] = p_cast;
        await window.fetch('http://192.168.15.4:3004/projetos/' + p.id, {method: 'DELETE'})
        await window.fetch('http://192.168.15.4:3004/projetos', {method: 'POST', body: JSON.stringify(p_cast),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });

        i++;
    }
});

When('a tela de listagem de projetos é acessada', () => cy.visit('./'));

Then('os projetos são exibidos', function () {
    for(let p of this.projetos){
        //nome do projeto
        cy.get(`#${p.id}`)
            .contains(p.nome)
            .should('be.visible');
        //dados do projeto       
        cy.get(`#${p.id}`)
            .contains(`${p.unidade} ${p.unidadeAtual}/${p.unidadesTotais} IDC ${p.idc.toFixed(2)} IDP ${p.idp.toFixed(2)}`)
            .should('be.visible')
    }
});


Given('que é exibida a tela de listagem de projetos', () => cy.visit('./'));

When('clico no botão novo projeto', () => cy.get('#btn_novo_projeto').click());

Then('a tela de cadastramento de novo projeto é exibida', () => 
    cy.get('#lbl_titulo_pagina_form').contains('Novo Projeto')
)

When('clico em um projeto', () => cy.get('#1').click());

Then('a tela do projeto é exibida', () => 
    cy.get('#lbl_titulo_pagina_form').contains('Alterar Projeto'))

When('clico no ícone de excluir um projeto', () => cy.get('#btn_excluir_1').click());

And('confirmo a exclusão', () => cy.get('#btn_confirmar_exclusao').click());

Then('é exibida a tela de listagem de projetos', () => 
    cy.get('#lbl_titulo_pagina_listagem').contains('Projetos'));

And('é exibida a mensagem de exclusão com sucesso', () => 
    cy.get('#alert_msg').contains('Projeto Excluído com Sucesso!'));

And('o projeto excluído não está nela', () => cy.get('#1').should('not.exist'));
