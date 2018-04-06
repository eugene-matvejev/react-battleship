describe('auth form', () => {
    describe('fields', () => {
        it('button is present', () => {
            cy.visit('/');

            cy.get('.handler button').should(($el) => {
                expect($el).to.have.length(1)
            })
        });
    });

    describe('callbacks', () => {
        [
            {username: 's', password: '', expected: {code: 201}},
            {username: 'a', password: '', expected: {code: 500}},
        ].forEach(({username, password, expected}) => {
            it(`onSubmit {username: "${username}", password: "${password}"}`, () => {
                cy.visit('/');

                cy.get('.input-wrapper').first().find('input').type(username);
                // cy.get('.input-wrapper:nth-child(2) input').type(password);
            });
        });
    });
});
