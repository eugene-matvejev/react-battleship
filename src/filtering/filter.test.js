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

    describe(`detection of pattern in root node`, () => {
        [
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
        ].forEach(([text, pattern, c]) => {
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
[
    ['text', 'a', undefined],
]
            .forEach(([text, pattern]) => {
                it(`searching for "${pattern}" in "${text}", expect [::chunks] to be undefined`, () => {
                    const v = { text };

                    filter(v, pattern);
                    expect(v.chunks).toBeUndefined();
                });
            });
    });

    describe(`detection of pattern in children nodes & propogation of ::isExpanded, ::isVisible fields`, () => {
        [
            [
                'aaa > bbb > CCC',
                {
                    text: 'aaa',
                    nodes: [
                        {
                            text: 'bbb',
                            nodes: [
                                {
                                    text: 'CCC',
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
                    isExpanded: true,
                    isVisible: true,
                    chunks: undefined,
                    nodes: [
                        {
                            text: 'bbb',
                            isExpanded: true,
                            isVisible: true,
                            chunks: undefined,
                            nodes: [
                                {
                                    text: 'CCC',
                                    isExpanded: false,
                                    isVisible: true,
                                    chunks: [
                                        { v: 'C', isMatch: true },
                                        { v: 'C', isMatch: true },
                                        { v: 'C', isMatch: true },
                                    ],
                                    nodes: [],
                                },
                            ],
                        },
                    ],
                },
            ],
            [
                'aaa > bbb > CCC',
                {
                    text: 'aaa',
                    nodes: [
                        {
                            text: 'bbb',
                            nodes: [
                                {
                                    text: 'CCC',
                                    nodes: [
                                    ],
                                },
                            ],
                        },
                    ],
                },
                '',
                {
                    text: 'aaa',
                    isExpanded: false,
                    isVisible: false,
                    chunks: undefined,
                    nodes: [
                        {
                            text: 'bbb',
                            isExpanded: false,
                            isVisible: false,
                            chunks: undefined,
                            nodes: [
                                {
                                    text: 'CCC',
                                    isExpanded: false,
                                    isVisible: false,
                                    chunks: undefined,
                                    nodes: [],
                                },
                            ],
                        },
                    ],
                },
            ]
        ].forEach(([title, v, pattern, expected]) => {
            it(`${title} [pattern: "${pattern}"]`, () => {
                filter(v, pattern);

                expect(v).toEqual(expected);
            });
        });
    });

    // describe('propogation of [::isExpanded] field', () => {
    //     dataProvider.forEach(([text, pattern, c]) => {
    //         it(`searching for "${pattern}" in "${text}", expect to be ${`${!!c}`.toUpperCase()}`, () => {
    //             const v = { text };

    //             const result = filter(v, pattern);

    //             expect(result).toBe(!!c);
    //         });
    //     });
    // });

    // describe('propogation of [::isVisible] field', () => {
    //     dataProvider.forEach(([text, pattern, c]) => {
    //         it(`searching for "${pattern}" in "${text}", expect to be ${`${!!c}`.toUpperCase()}`, () => {
    //             const v = { text };

    //             const result = filter(v, pattern);

    //             expect(result).toBe(!!c);
    //         });
    //     });
    // });
});
