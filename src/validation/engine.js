export default (c) => {
    let isValid = true;
    for (const { items } of c) {
        for (const { validators, value: v } of items) {
            if (!Array.isArray(validators)) {
                continue;
            }

            validators.forEach((cb) => cb(c, v));
        }
    }

    return isValid;
}
