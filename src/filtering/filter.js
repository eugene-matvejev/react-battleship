export const filter = (obj, pattern) => {
    const text = obj.text.toLowerCase();

    let index = text.indexOf(pattern);

    const chunks = index !== -1 ? [] : undefined;
    let pos = 0;
    let left = text;

    obj.iter = 0;
    while (index !== -1) {
        if (index === 0) {
            index = pattern.length;
        }
        obj.iter++;
        chunks.push({
            v: obj.text.slice(pos, pos + index),
            isMatch: text.slice(pos, pos + index) === pattern,
        });

        left = text.slice(index);
        pos += index;

        if (pos === text.length) {
            break;
        }

        index = left.indexOf(pattern);

        if (index === -1) {
            chunks.push({
                v: obj.text.slice(pos),
                isMatch: false,
            });
        }
    }

    obj.chunks = chunks;
    obj.isExpanded = !!obj.chunks;

    if (!obj.nodes) {
        return false;
    }

    for (const v of obj.nodes) {
        if (filter(v, pattern)) {
            obj.isExpanded = true;
        }
    }

    return obj.isExpanded;
}
