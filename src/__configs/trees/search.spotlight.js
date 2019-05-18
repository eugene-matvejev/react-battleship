import axios from 'axios';

import { filter } from '../../filtering/filter';

const onMount = (props, state, onSuccess, onError) => {
    const { pattern } = state;

    axios
        .get(`/spotlight`)
        .then((r) => {

            debugger;
            const data = r.data;
            onFilter(data, pattern);

            onSuccess({ data });
        })
        .catch((r) => {
            onError({  });
        });
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
