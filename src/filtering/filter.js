export const filter = (obj, pattern) => {
    const text = obj.text.toLowerCase();

    let pos = 0;
    let left = text;
    let index = !pattern ? -1 : text.indexOf(pattern);

    // obj.iter = 0;
    obj.chunks = index !== -1 ? [] : undefined;

    while (index !== -1) {
        // obj.iter++;
        if (index === 0) {
            index = pattern.length;
        }

        obj.chunks.push({
            v: obj.text.slice(pos, pos + index),
            isMatch: text.slice(pos, pos + index) === pattern,
        });

        left = left.slice(index);
        pos += index;

        if (pos === text.length) {
            break;
        }

        index = left.indexOf(pattern);

        if (index === -1) {
            obj.chunks.push({
                v: obj.text.slice(pos),
                isMatch: false,
            });
        }
    }

    obj.isVisible = !!obj.chunks;
    obj.isExpanded = false;

    if (!obj.nodes) {
        return obj.isVisible;
    }

    for (const v of obj.nodes) {
        if (filter(v, pattern)) {
            obj.isExpanded = true;
            obj.isVisible = true;
        }
    }

    return obj.isVisible;
}
