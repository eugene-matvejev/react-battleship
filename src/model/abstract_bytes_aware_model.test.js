import Model from "./abstract_bytes_aware_model";

describe(`model:: abstract bytes aware model`, () => {
    const model = new Model();

    describe(`::constructor`, () => {
        it(`mandatory fields [bytes] are initialized`, () => {
            expect(model.bytes).toBeDefined();
        });
    });

    describe(`::(get|set)Bytes`, () => {
        [
            0x00,
            0x02,
            0xFF,
        ].forEach(bytes => {
            it(`when setter been called with ${bytes} getter should return them too`, () => {
                model.setBytes(bytes);

                expect(model.getBytes()).toBe(bytes);
            });
        });
    });

    describe(`::addBytes`, () => {
        [
            { currentBytes: 0x00, bytes: 0x00, expectedBytes: 0x00 },
            { currentBytes: 0x02, bytes: 0x00, expectedBytes: 0x02 },
            { currentBytes: 0x02, bytes: 0x02, expectedBytes: 0x02 },
            { currentBytes: 0x00, bytes: 0x02, expectedBytes: 0x02 },
            { currentBytes: 0xF0, bytes: 0x0F, expectedBytes: 0xFF },
        ].forEach(el => {
            it(`add bytes ${el.bytes} to ${el.currentBytes}, expected bytes: ${el.expectedBytes}`, () => {
                model.setBytes(el.currentBytes);
                model.addBytes(el.bytes);

                expect(model.getBytes()).toBe(el.expectedBytes);
            });
        });
    });

    describe(`::removeBytes`, () => {
        [
            { currentBytes: 0x00, bytes: 0x00, expectedBytes: 0x00 },
            { currentBytes: 0x02, bytes: 0x00, expectedBytes: 0x02 },
            { currentBytes: 0x02, bytes: 0x02, expectedBytes: 0x00 },
            { currentBytes: 0x00, bytes: 0x02, expectedBytes: 0x00 },
            { currentBytes: 0xF0, bytes: 0x0F, expectedBytes: 0xF0 },
            { currentBytes: 0x0F, bytes: 0xFF, expectedBytes: 0x00 },
        ].forEach(el => {
            it(`remove bytes ${el.bytes} from ${el.currentBytes}, expected bytes: ${el.expectedBytes}`, () => {
                model.setBytes(el.currentBytes);
                model.removeBytes(el.bytes);

                expect(model.getBytes()).toBe(el.expectedBytes);
            });
        });
    });

    describe(`::hasBytes`, () => {
        [
            { currentBytes: 0x00, bytes: 0x00 },
            { currentBytes: 0x03, bytes: 0x02 },
            { currentBytes: 0x07, bytes: 0x03 },
            { currentBytes: 0xFF, bytes: 0xF0 },
            { currentBytes: 0xFF, bytes: 0xFF },
        ].forEach(el => {
            it(`expected true as bytes ${el.bytes} are presented in ${el.currentBytes}`, () => {
                model.setBytes(el.currentBytes);

                expect(model.hasBytes(el.bytes)).toBe(true);
            });
        });

        [
            { currentBytes: 0x00, bytes: 0x01 },
            { currentBytes: 0x03, bytes: 0x04 },
            { currentBytes: 0x07, bytes: 0x08 },
            { currentBytes: 0x0F, bytes: 0xF0 },
            { currentBytes: 0x1F, bytes: 0xF0 },
        ].forEach(el => {
            it(`expected false as bytes ${el.bytes} are not presented in ${el.currentBytes}`, () => {
                model.setBytes(el.currentBytes);

                expect(model.hasBytes(el.bytes)).toBe(false);
            });
        });
    });
});