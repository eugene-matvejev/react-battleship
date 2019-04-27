describe(`<FormHandler/>`, () => {
    it(`as a user,
        I should observe error messages on wrong inputs, and no errors on valid inputs,
        I should unable to submit form if it contain at least one error`, () => {
        cy.visit('/');

        cy.get('[data-cy="section-0-input-0"]').clear().type('example');
        cy.get('[data-cy="section-0-input-0-error-0"]').should('exist');
        cy.get('[data-cy="form-action-submit"]').should('be.disabled');

        cy.get('[data-cy="section-0-input-0"]').clear().type('example@example');
        cy.get('[data-cy="section-0-input-0-error-0"]').should('exist');
        cy.get('[data-cy="form-action-submit"]').should('be.disabled');

        cy.get('[data-cy="section-0-input-0"]').clear().type('example@example.com');
        cy.get('[data-cy="section-0-input-0-error-0"]').should('not.exist');
        cy.get('[data-cy="form-action-submit"]').should('not.disabled');

        cy.get('[data-cy="section-0-input-1"]').clear();
        cy.get('[data-cy="section-0-input-1-error-0"]').should('exist');
        cy.get('[data-cy="form-action-submit"]').should('be.disabled');

        cy.get('[data-cy="section-0-input-1"]').clear().type('password');
        cy.get('[data-cy="section-0-input-1-error-0"]').should('not.exist');
        cy.get('[data-cy="form-action-submit"]').should('not.disabled');
    });
});
