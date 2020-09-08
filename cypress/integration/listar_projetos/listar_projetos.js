import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('que temos projetos cadastrados', function (projetos) {
    this.projetos = projetos.hashes();
    cy.log(projetos);
    //aqui deveria incluir os dados em um banco de dados de teste.
});

When('a tela de listagem de projetos é acessada', function () {
    cy.visit('./');
});

Then('os projetos são exibidos', function () {
    
    for(let i in this.projetos){
        
        cy.get("#projetos")
            .find('tbody tr').eq(i)
            .contains('td:first', this.projetos[i].Projeto)
            .should('be.visible')
            
            cy.get("#projetos")
            .find('tbody tr').eq(i).find('td').eq(1)
            .should('contain', `${this.projetos[i].Unidade} ${this.projetos[i].UnAtual}/${this.projetos[i].UnTotal} IDC ${this.projetos[i].IDC} IDP ${this.projetos[i].IDP}`)
            .should('be.visible')
            
            cy.get("#projetos")
            .find('tbody tr').eq(i).find('td').eq(2)
            .should('contain', 'X')
            .should('be.visible')
    }
    
});
