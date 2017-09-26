import PlayerModel from "./player_model";

describe(`model:: <PlayerModel/>`, () => {
    const model = new PlayerModel();
    const dataProvider = [
        {id: 1, email: 'example1@example.com'},
        {id: 2, email: 'example2@example.com'}
    ];

    describe(`::constructor`, () => {
        it(`mandatory fields [id|username|email|byte_sequence] should be initialized`, () => {
            expect(model.id).toBeDefined();
            expect(model.name).toBeDefined();
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

            it(`::(get|set)Name - value "${data.email}" should be encapsulated`, () => {
                model.setName(data.email);
                expect(model.getName()).toBe(data.email)
            });
        });
    });
});
