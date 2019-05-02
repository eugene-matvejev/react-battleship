describe(`<SideNav/>`, () => {
    it(`as a user, I should able to toggle <SideNav/>, collapsed <SiderNav/> should not have links`, () => {
        cy.visit('/');

        cy.get('[data-cy="sidenav-label"]').should('exist');
        cy.get('[data-cy^="sidenav-link-"]').should('exist');

        cy.get('[data-cy="sidenav-collapse-button"]').click();

        cy.get('[data-cy="sidenav-label"]').should('not.exist');
        cy.get('[data-cy^="sidenav-link-"]').should('not.exist');
    });
});
