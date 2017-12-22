import { generateCell } from './cell_generator';

describe(`generator:: Cell`, () => {
    [
        {x: 1, y: 1, coordinate: 'A1'},
        {x: 1, y: 2, coordinate: 'A2'},
        {x: 2, y: 3, coordinate: 'B3'}
    ].forEach((el) => {
        it(`expected coordinate: '${el.coordinate}' of generated cell using x: ${el.x}, y: ${el.y}`, () => {
            const cell = generateCell(el.x, el.y);

            expect(cell.coordinate).toBe(el.coordinate);
        });
    })
});
