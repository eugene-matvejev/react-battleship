import {
    composeRule,
    composeConditionalRule,
    isRequired,
    isMatchRegex,
    isLengthBetween
} from './rules';

describe('validation rules', () => {
    describe('::isRequired', () => {
        [
            ["x", true],
            ["", false],
            [1, true],
            [0, true],
            [true, true],
            [false, true],
            [null, false],
            [undefined, false],
        ].forEach(([v, r]) => {
            it(`on "${v}" should return "${r}"`, () => {
                expect(isRequired(v)).toBe(r);
            });
        });
    });

    describe('::isMatchRegex', () => {
        [
            [1, /^[1-9]+$/, true],
            [1, '[1-9]+', true],
            [0, /^[1-9]+$/, false],
            [0, '[1-9]+', false],
        ].forEach(([v, pattern, r]) => {
            it(`on "${v}" should return "${r}" as "${v}" ${!r ? 'NOT ' : ''}match "${pattern}" pattern`, () => {
                expect(isMatchRegex(v, pattern)).toBe(r);
            });
        });
    });

    describe('::isLengthBetween', () => {
        [
            ['one', 0, 4, true],
            ['one', 1, 4, true],
            ['one', 2, 4, true],
            ['one', 0, 3, true],
            ['one', 0, 2, false],
            ['one', 4, undefined, false],
            ['one', undefined, undefined, true],
            ['one', undefined, 4, true],
            ['one', undefined, 2, false],
        ].forEach(([v, min, max, r]) => {
            it(`on content's length ${v.length} should return "${r}" when min: ${min} and max: ${max}`, () => {
                expect(isLengthBetween(v, min, max)).toBe(r);
            });
        });
    });
});

describe('composed validation rules', () => {
    const errorMsg = 'error message';

    describe('::composeRule', () => {
        [
            [true, isRequired, undefined, true],
            ["", isRequired, undefined, errorMsg],
            [null, isRequired, undefined, errorMsg],
            [undefined, isRequired, undefined, errorMsg],

            [1, isMatchRegex, ['[1-9]+'], true],
            [1, isMatchRegex, [/[1-9]+/], true],
            [0, isMatchRegex, ['[1-9]+'], errorMsg],
            [0, isMatchRegex, [/[1-9]+/], errorMsg],

            ['one', isLengthBetween, [1], true],
            ['one', isLengthBetween, [undefined, 3], true],
            ['one', isLengthBetween, [1, 3], true],
            ['one', isLengthBetween, [undefined, 1], errorMsg],
            ['one', isLengthBetween, [4, undefined], errorMsg],
        ].forEach(([v, rule, args, r]) => {
            it(`using "${rule.name}" rule and ${undefined !== args ? `arguments: [${args}]`: 'NO arguments'} it should return "${r}"`, () => {
                expect(composeRule(rule, errorMsg, args)(v)).toBe(r);
            });
        });

        it('when ::message argument is a function, it should be called with own and composed arguments', () => {
            const spy = jest.fn();

            composeRule(() => false, spy, [2])(1);

            expect(spy).toBeCalledWith(1, 2);
        });
    });

    describe('::composeConditionalRule', () => {
        it(`when condition is truthy, rule should be executed`, () => {
            const spy = jest.fn();

            composeConditionalRule(() => 1, spy)(1);

            expect(spy).toBeCalledWith(1)
        });

        it(`when condition is falsy, rule should NOT be executed`, () => {
            const spy = jest.fn();

            composeConditionalRule(() => 0, spy)();

            expect(spy).not.toBeCalled()
        });
    });
});
