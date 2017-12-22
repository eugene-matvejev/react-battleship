import { AbstractByteSequenceAwareModel } from './';

describe(`model:: <AbstractByteSequenceAwareModel/>`, () => {
    const model = new AbstractByteSequenceAwareModel();

    describe(`::constructor`, () => {
        it(`mandatory fields [byte_sequence] are initialized`, () => {
            expect(model.byte_sequence).toBeDefined();
        });
    });

    describe(`::(get|set)Sequence`, () => {
        [
            0x00,
            0x02,
            0xFF,
        ].forEach(seq => {
            it(`when setter been called with ${seq} getter should return them too`, () => {
                model.setSequence(seq);

                expect(model.getSequence()).toBe(seq);
            });
        });
    });

    describe(`::addSequence`, () => {
        [
            {currentSequence: 0x00, sequenceModifier: 0x00, expectedSequence: 0x00},
            {currentSequence: 0x02, sequenceModifier: 0x00, expectedSequence: 0x02},
            {currentSequence: 0x02, sequenceModifier: 0x02, expectedSequence: 0x02},
            {currentSequence: 0x00, sequenceModifier: 0x02, expectedSequence: 0x02},
            {currentSequence: 0xF0, sequenceModifier: 0x0F, expectedSequence: 0xFF},
        ].forEach(el => {
            it(`add bytes ${el.bytes} to ${el.currentSequence}, expected sequenceModifier: ${el.expectedSequence}`, () => {
                model.setSequence(el.currentSequence);
                model.addSequence(el.sequenceModifier);

                expect(model.getSequence()).toBe(el.expectedSequence);
            });
        });
    });

    describe(`::removeSequence`, () => {
        [
            {currentSequence: 0x00, sequenceModifier: 0x00, expectedSequence: 0x00},
            {currentSequence: 0x02, sequenceModifier: 0x00, expectedSequence: 0x02},
            {currentSequence: 0x02, sequenceModifier: 0x02, expectedSequence: 0x00},
            {currentSequence: 0x00, sequenceModifier: 0x02, expectedSequence: 0x00},
            {currentSequence: 0xF0, sequenceModifier: 0x0F, expectedSequence: 0xF0},
            {currentSequence: 0x0F, sequenceModifier: 0xFF, expectedSequence: 0x00},
        ].forEach(el => {
            it(`remove bytes ${el.bytes} from ${el.currentSequence}, expected sequenceModifier: ${el.expectedSequence}`, () => {
                model.setSequence(el.currentSequence);
                model.removeSequence(el.sequenceModifier);

                expect(model.getSequence()).toBe(el.expectedSequence);
            });
        });
    });

    describe(`::hasSequence`, () => {
        [
            {currentSequence: 0x00, sequence: 0x00},
            {currentSequence: 0x03, sequence: 0x02},
            {currentSequence: 0x07, sequence: 0x03},
            {currentSequence: 0xFF, sequence: 0xF0},
            {currentSequence: 0xFF, sequence: 0xFF},
        ].forEach(el => {
            it(`expected true as bytes ${el.bytes} are presented in ${el.currentSequence}`, () => {
                model.setSequence(el.currentSequence);

                expect(model.hasSequence(el.sequence)).toBe(true);
            });
        });

        [
            {currentSequence: 0x00, sequence: 0x01},
            {currentSequence: 0x03, sequence: 0x04},
            {currentSequence: 0x07, sequence: 0x08},
            {currentSequence: 0x0F, sequence: 0xF0},
            {currentSequence: 0x1F, sequence: 0xF0},
        ].forEach(el => {
            it(`expected false as bytes ${el.bytes} are not presented in ${el.currentSequence}`, () => {
                model.setSequence(el.currentSequence);

                expect(model.hasSequence(el.sequence)).toBe(false);
            });
        });
    });
});
