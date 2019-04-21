const executeValidations = (item, c) => {
    const { validators, value } = item;

    if (!Array.isArray(validators)) {
        return true;
    }

    item.errors = [];

    let isValid = true;

    for (const fn of validators) {
        const r = fn(value, c);
        /**
         * if result is a string, then it is considered as error, otherwise it considered as valid
         */
        if (typeof r === 'string') {
            isValid = false;

            item.errors.push(r);
        }
    }

    return isValid;
}

/**
 * @param {Array} c
 * @param {Array} enforceValidationOn
 *
 * example of enforceValidationOn
 *  [[sectionId, itemId]] - will validate only item in specific section
 *  [[sectionId, undefined]] - will validate entire section, if item is not defined
 */
export const validationEngine = (c, enforceValidationOn) => {
    let isValid = true;

    if (Array.isArray(enforceValidationOn)) {
        for (const [sectionId, itemId] of enforceValidationOn) {
            if (undefined === itemId) {
                for (const item of c[sectionId].items) {
                    if (!executeValidations(item, c)) {
                        isValid = false;
                    }
                }

                continue;
            }

            if (!executeValidations(c[sectionId].items[itemId], c)) {
                isValid = false;
            }
        }

        return isValid;
    }

    for (const { items } of c) {
        for (const item of items) {
            if (!executeValidations(item, c)) {
                isValid = false;
            }
        }
    }

    return isValid;
}
