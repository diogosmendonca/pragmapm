import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('que temos projetos cadastrados', function () {
    
});

When('a tela de listagem de projetos é acessada', function () {
    cy.visit('./index.html');
});

Then('os projetos são exibidos', function () {
    //Projeto 1
    cy.get("#projetos")
    .find('tbody tr').eq(0)
    .contains('td:first', 'Projeto X')
    .should('be.visible')

    cy.get("#projetos")
    .find('tbody tr').eq(0).find('td').eq(1)
    .should('contain', 'Semana 2/4 IDC 0.8 IDP 0.9')
    .should('be.visible')

    cy.get("#projetos")
    .find('tbody tr').eq(0).find('td').eq(2)
    .should('contain', 'X')
    .should('be.visible')

    //Projeto 2
    cy.get("#projetos")
    .find('tbody tr').eq(1)
    .contains('td:first', 'Projeto Y')
    .should('be.visible')

    cy.get("#projetos")
    .find('tbody tr').eq(1).find('td').eq(1)
    .should('contain', 'Semana 4/6 IDC 1.3 IDP 1.0')
    .should('be.visible')

    cy.get("#projetos")
    .find('tbody tr').eq(1).find('td').eq(2)
    .should('contain', 'X')
    .should('be.visible')

    //Projeto 3
    cy.get("#projetos")
    .find('tbody tr').eq(2)
    .contains('td:first', 'Projeto Z')
    .should('be.visible')

    cy.get("#projetos")
    .find('tbody tr').eq(2).find('td').eq(1)
    .should('contain', 'Semana 3/10 IDC 1.0 IDP 1.0')
    .should('be.visible')

    cy.get("#projetos")
    .find('tbody tr').eq(2).find('td').eq(2)
    .should('contain', 'X')
    .should('be.visible')
});
