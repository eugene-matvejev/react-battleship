import { filter } from './filter';

describe('tree filter engine', () => {
    const dataProvider = [
        ['text', 'a', undefined],
        ['text', 'text', [{ v: 'text', isMatch: true }]],
        ['TEXT text', 'text', [{ v: 'TEXT', isMatch: true }, { v: ' ', isMatch: false }, { v: 'text', isMatch: true }]],
        [
            'TEXT text text text',
            'text',
            [
                { v: 'TEXT', isMatch: true },
                { v: ' ', isMatch: false },
                { v: 'text', isMatch: true },
                { v: ' ', isMatch: false },
                { v: 'text', isMatch: true },
                { v: ' ', isMatch: false },
                { v: 'text', isMatch: true },
            ]
        ],
        ['TTT', 't', [{ v: 'T', isMatch: true }, { v: 'T', isMatch: true }, { v: 'T', isMatch: true }]],
        ['T T', 't', [{ v: 'T', isMatch: true }, { v: ' ', isMatch: false }, { v: 'T', isMatch: true }]],
        ['TEXT', 't', [{ v: 'T', isMatch: true }, { v: 'EX', isMatch: false }, { v: 'T', isMatch: true }]],
        ['TEXT', 'te', [{ v: 'TE', isMatch: true }, { v: 'XT', isMatch: false }]],
    ];

    describe(`detection of pattern in [::text] in lowercase mode`, () => {
        dataProvider
            .filter((v) => v[2])
            .forEach(([text, pattern, c]) => {
                describe(`searching for "${pattern}" in "${text}"`, () => {
                    it(`expect [::chunks] to have length ${c.length}`, () => {
                        const v = { text };

                        filter(v, pattern);
                        expect(v.chunks).toHaveLength(c.length);
                    });

                    it(`expect [::isMatch] in chunk to be TRUE, if it matches ::pattern, otherwise FALSE`, () => {
                        const v = { text };

                        filter(v, pattern);
                        expect(v.chunks).toEqual(c);
                    });
                });
            });

        dataProvider
            .filter((v) => !v[2])
            .forEach(([text, pattern]) => {
                it(`searching for "${pattern}" in "${text}", expect [::chunks] to be undefined`, () => {
                    const v = { text };

                    filter(v, pattern);
                    expect(v.chunks).toBeUndefined();
                });
            });
    });

    describe.skip('propogation of isCollapsed', () => {
        dataProvider.forEach(([text, pattern, c]) => {
            it(`searching for "${pattern}" in "${text}", expect [::isCollapsed] to be ${`${!!c}`.toUpperCase()}`, () => {
                const v = { text };

                const result = filter(v, pattern);

                expect(result).toBe(!!c);
            });
        });
    });
});
