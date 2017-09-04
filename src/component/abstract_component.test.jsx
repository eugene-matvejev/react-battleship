import AbstractComponent from "./abstract_component";

describe(`component:: <AbstractComponent/>`, () => {
    describe(`::constructor`, () => {
        it(` - constructor should set mandatory state fields [data|model|attributes]`, () => {
            const component = new AbstractComponent();

            expect(component.state).toBeDefined();
            expect(component.state.data).toBeDefined();
            expect(component.state.model).toBeDefined();
            expect(component.state.attributes).toBeDefined();
        });
    });
});
