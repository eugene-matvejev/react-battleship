import axios from 'axios';

import { filter } from '../../filtering/filter';

const onMount = (props, state, onSuccess, onError) => {
    const { pattern } = state;

    axios
        .get(`/spotlight`)
        .then((r) => {
            const data = r.data;
            onFilter(data, pattern);

            onSuccess({ data });
        })
        .catch(onError);
};

const onExpand = (data, path) => {
    let pos = 0;
    let cursor = data;
    const arr = path.split('-');

    while (pos < arr.length) {
        cursor = pos === arr.length - 1
            ? cursor[arr[pos]]
            : cursor[arr[pos]].nodes;

        pos++;
    }

    cursor.isExpanded = !cursor.nodes.some((v) => v.isVisible);
    cursor.nodes.forEach((v, i) => v.isVisible = cursor.isExpanded);
};

const onFilter = (data, pattern) => {
    pattern = (pattern || '').toLowerCase();

    for (const v of data) {
        v.isExpanded = filter(v, pattern);

        if (!pattern) {
            v.isExpanded = false;
            v.isVisible = true;
        }
    }
};

export default {
    onMount,

    onExpand,
    onFilter,
}
