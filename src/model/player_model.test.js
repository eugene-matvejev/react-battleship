import PlayerModel from "./player_model";

describe(`model:: Player`, () => {
    const model = new PlayerModel();
    const dataProvider = [
        {id: 1, email: 'example1@example.com'},
        {id: 2, email: 'example2@example.com'}
    ];

    describe(`::constructor`, () => {
        it(`::constructor - mandatory fields [id|username|email|byte_sequence] should be initialized`, () => {
            expect(model.id).toBeDefined();
            expect(model.username).toBeDefined();
            expect(model.email).toBeDefined();
            expect(model.byte_sequence).toBeDefined();
            expect(model.byte_sequence).toBe(0);
        });
    });

    describe(`::getters/setters`, () => {
        dataProvider.forEach(data => {
            it(`::(get|set)Id - value "${data.id}" should be encapsulated`, () => {
                model.setId(data.id);
                expect(model.getId()).toBe(data.id)
            });

            it(`::(get|set)Email - value "${data.email}" should be encapsulated`, () => {
                model.setEmail(data.email);
                expect(model.getEmail()).toBe(data.email)
            });

            it(`::(get|set)Username - value "${data.email}" should be encapsulated`, () => {
                model.setUsername(data.email);
                expect(model.getUsername()).toBe(data.email)
            });
        });
    });
});
