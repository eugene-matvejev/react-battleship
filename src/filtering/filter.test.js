import { filter } from './filter';

describe('tree filter engine', () => {
    const dataProvider = [
        ['text', 'a', undefined],
        [
            'player',
            'a',
            [
                { v: 'pl', isMatch: false },
                { v: 'a', isMatch: true },
                { v: 'yer', isMatch: false },
            ]
        ],
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

    describe(`detection of pattern in lowercase mode in children nodes`, () => {
        [
            [
                {
                    text: 'aaa',
                    nodes: [
                        {
                            text: 'bbb',
                            nodes: [
                                {
                                    text: 'ccc',
                                    nodes: [
                                    ],
                                },
                            ],
                        },
                    ],
                },
                'c',
                {
                    text: 'aaa',
                    nodes: [
                        {
                            text: 'bbb',
                            nodes: [
                                {
                                    text: 'CCC',
                                    chunks: [
                                        { v: 'C', isMatch: true },
                                        { v: 'C', isMatch: true },
                                        { v: 'C', isMatch: true },
                                    ]
                                },
                            ],
                        },
                    ],
                },
            ]
        ].forEach((v, pattern, expected) => {
            it.only('aaa > bbb > ccc', () => {
                filter(v, pattern);

                expect(v).toEqual(expected);
            });
        });
    });

    describe('propogation of [::isExpanded] field', () => {
        dataProvider.forEach(([text, pattern, c]) => {
            it(`searching for "${pattern}" in "${text}", expect to be ${`${!!c}`.toUpperCase()}`, () => {
                const v = { text };

                const result = filter(v, pattern);

                expect(result).toBe(!!c);
            });
        });
    });

    describe('propogation of [::isVisible] field', () => {
        dataProvider.forEach(([text, pattern, c]) => {
            it(`searching for "${pattern}" in "${text}", expect to be ${`${!!c}`.toUpperCase()}`, () => {
                const v = { text };

                const result = filter(v, pattern);

                expect(result).toBe(!!c);
            });
        });
    });
});
