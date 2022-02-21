/// <reference types= "Cypress" />

const URL = '127.0.0.1:8080';
const CANTIDAD_MONEDAS = 162;

context('exchange-rate', () => {

    before(() => {
        cy.visit(URL);
    });

    it('se asegura que se carguen todas las monedas', () => {
        cy.get('#base-tabla').find('option').should('have.length', CANTIDAD_MONEDAS);
    });

    it('se asegura que se muestre mensaje de alerta', () => {
        cy.get('select#base-tabla option:selected').then(() => {
            cy.get('#generar-tabla').click();
            cy.get('#liveAlertPlaceholder .alert').should('exist');
        });
    });
        
    describe('se asegura que se genere la tabla con la base seleccionada', () => {
        const BASE = 'USD';

        it('se asegura que se genere la tabla de cambios', () => {
            cy.get('select#base-tabla').select(BASE).then(() => {
                cy.get('#generar-tabla').click();
                cy.get('#tabla').should('not.have.class', 'invisible');
            });
        });

        it('se asegura que la base de la tabla sea la seleccionada', () => {
            cy.get('#tabla tbody td:first').should('have.text', BASE);
        });
    });

});
