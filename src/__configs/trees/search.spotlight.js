import generate from 'node-random-name';
import { filter } from '../../filtering/filter';

const onMount = (props, state, onSuccess, onError) => {
    const players = {
        text: 'players',
        nodes: (new Array(20)).fill(1).map(() => ({ text: `${generate()} a` })),
    };
    const friends = {
        text: 'friends',
        nodes: (new Array(10)).fill(1).map(() => ({ text: `${generate()} b` })),
    };
    const battles = {
        text: 'battles',
        nodes: (new Array(10)).fill(1).map(() => ({ text: `${generate()} c` }))
    };

    const data = [
        friends,
        players,
        battles,
    ];
    const { pattern } = state;

    onFilter(data, pattern);

    onSuccess({ data });
};


const onFilter = (data, pattern) => {
    pattern = (pattern || '').toLowerCase();

    for (const v of data) {
        v.isExpanded = filter(v, pattern);

        if (!pattern) {
            v.isExpanded = true;
        }
    }
}

export default {
    onMount,

    onFilter,
}
