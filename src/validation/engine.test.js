import { validationEngine } from './engine';

describe('validation engine', () => {
    const c = [
        {
            items: [
            ],
        },
        {
            items: [
            ],
            items: [
            ],
        },
    ];

    describe('[default mode]', () => {
        it(`should return TRUE when validators are NOT defined, expected NO error messages in snapshot`, () => {
            c[0].items[0] = {}
            c[1].items[0] = {};
            c[1].items[1] = {};

            const v = validationEngine(c);

            expect(v).toBe(true);
            expect(c).toMatchSnapshot();
        });

        it(`should return TRUE when validators are empty, expected NO error messages in snapshot`, () => {
            c[0].items[0] = {
                validators: [],
            };
            c[1].items[0] = {};
            c[1].items[1] = {};

            const v = validationEngine(c);

            expect(v).toBe(true);
            expect(c).toMatchSnapshot();
        });

        it(`should return TRUE when all defined validators PASS, expected NO error messages in snapshot`, () => {
            c[0].items[0] = {
                validators: [
                    () => true,
                ],
            };
            c[1].items[0] = {};
            c[1].items[1] = {};


            const v = validationEngine(c);

            expect(v).toBe(true);
            expect(c).toMatchSnapshot();
        });

        it(`should return FALSE when all defined validators FAIL, expected error messages in snapshot`, () => {
            c[0].items[0] = {
                validators: [
                    () => '{{error message}}',
                ],
            };
            c[1].items[0] = {};
            c[1].items[1] = {};

            const v = validationEngine(c);

            expect(v).toBe(false);
            expect(c).toMatchSnapshot();
        });

        it(`should return FALSE when at least one of defined validators FAIL, expected error messages in snapshot`, () => {
            c[0].items[0] = {
                validators: [
                    () => '{{error message}}',
                    () => true,
                ],
            };
            c[1].items[0] = {};
            c[1].items[1] = {};

            const v = validationEngine(c);

            expect(v).toBe(false);
            expect(c).toMatchSnapshot();
        });
    });

    describe('[enforced scope mode]', () => {
        describe('[scope limited to entire section]', () => {
            it(`should return TRUE when all validators in a scope PASS`, () => {
                c[0].items[0] = {
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[0] = {
                    value: '{{item-1-0}}',
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[1] = {
                    value: '{{item-1-1}}',
                    validators: [
                        jest.fn(),
                    ],
                };

                expect(validationEngine(c, [[1]])).toBe(true);

                expect(c[0].items[0].validators[0]).not.toBeCalled();
                expect(c[1].items[0].validators[0]).toBeCalledWith('{{item-1-0}}', c);
                expect(c[1].items[1].validators[0]).toBeCalledWith('{{item-1-1}}', c);

                expect(c).toMatchSnapshot();
            });

            it(`should return FALSE when all validators in a scope FAIL`, () => {
                c[0].items[0] = {
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[0] = {
                    value: '{{item-1-0}}',
                    validators: [
                        jest.fn(() => 'error'),
                    ],
                };
                c[1].items[1] = {
                    value: '{{item-1-1}}',
                    validators: [
                        jest.fn(() => 'error'),
                    ],
                };

                expect(validationEngine(c, [[1]])).toBe(false);

                expect(c[0].items[0].validators[0]).not.toBeCalled();
                expect(c[1].items[0].validators[0]).toBeCalledWith('{{item-1-0}}', c);
                expect(c[1].items[1].validators[0]).toBeCalledWith('{{item-1-1}}', c);

                expect(c).toMatchSnapshot();
            });

            it(`should return FALSE when at least one validator in a scope FAIL`, () => {
                c[0].items[0] = {
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[0] = {
                    value: '{{item-1-0}}',
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[1] = {
                    value: '{{item-1-1}}',
                    validators: [
                        jest.fn(() => 'error'),
                    ],
                };

                expect(validationEngine(c, [[1]])).toBe(false);

                expect(c[0].items[0].validators[0]).not.toBeCalled();
                expect(c[1].items[0].validators[0]).toBeCalledWith('{{item-1-0}}', c);
                expect(c[1].items[1].validators[0]).toBeCalledWith('{{item-1-1}}', c);

                expect(c).toMatchSnapshot();
            });
        });

        describe('[scope limited to specific item]', () => {
            it(`should return TRUE when all validators in a scope PASS`, () => {
                c[0].items[0] = {
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[0] = {
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[1] = {
                    value: '{{item-1-1}}',
                    validators: [
                        jest.fn(),
                    ],
                };

                expect(validationEngine(c, [[1, 1]])).toBe(true);

                expect(c[0].items[0].validators[0]).not.toBeCalled();
                expect(c[1].items[0].validators[0]).not.toBeCalled();
                expect(c[1].items[1].validators[0]).toBeCalledWith('{{item-1-1}}', c);

                expect(c).toMatchSnapshot();
            });

            it(`should return FALSE when all validators in a scope FAIL`, () => {
                c[0].items[0] = {
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[0] = {
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[1] = {
                    value: '{{item-1-1}}',
                    validators: [
                        jest.fn(() => 'error'),
                        jest.fn(() => 'error'),
                    ],
                };

                expect(validationEngine(c, [[1, 1]])).toBe(false);

                expect(c[0].items[0].validators[0]).not.toBeCalled();
                expect(c[1].items[0].validators[0]).not.toBeCalled();
                expect(c[1].items[1].validators[0]).toBeCalledWith('{{item-1-1}}', c);
                expect(c[1].items[1].validators[1]).toBeCalledWith('{{item-1-1}}', c);

                expect(c).toMatchSnapshot();
            });

            it(`should return FALSE when at least one validator in a scope FAIL`, () => {
                c[0].items[0] = {
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[0] = {
                    validators: [
                        jest.fn(),
                    ],
                };
                c[1].items[1] = {
                    value: '{{item-1-1}}',
                    validators: [
                        jest.fn(),
                        jest.fn(() => 'error'),
                    ],
                };

                expect(validationEngine(c, [[1, 1]])).toBe(false);

                expect(c[0].items[0].validators[0]).not.toBeCalled();
                expect(c[1].items[0].validators[0]).not.toBeCalled();
                expect(c[1].items[1].validators[0]).toBeCalledWith('{{item-1-1}}', c);
                expect(c[1].items[1].validators[1]).toBeCalledWith('{{item-1-1}}', c);

                expect(c).toMatchSnapshot();
            });
        });
    });
});
