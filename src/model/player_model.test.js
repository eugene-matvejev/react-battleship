import PlayerModel from "./player_model";

describe(`model:: <PlayerModel/>`, () => {
    const model = new PlayerModel();
    const dataProvider = [
        {id: 1, email: 'example1@example.com'},
        {id: 2, email: 'example2@example.com'}
    ];

    describe(`::constructor`, () => {
        it(`mandatory fields [id|username|email|byteSeq] should be initialized`, () => {
            expect(model.id).toBeDefined();
            expect(model.name).toBeDefined();
            expect(model.byteSeq).toBeDefined();
            expect(model.byteSeq).toBe(0);
        });
    });

    describe(`::getters/setters`, () => {
        dataProvider.forEach((el) => {
            it(`::(get|set)Id - value "${el.id}" should be encapsulated`, () => {
                model.setId(el.id);
                expect(model.getId()).toBe(el.id)
            });

            it(`::(get|set)Name - value "${el.email}" should be encapsulated`, () => {
                model.setName(el.email);
                expect(model.getName()).toBe(el.email)
            });
        });
    });
});
