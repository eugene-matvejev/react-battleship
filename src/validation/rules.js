/**
 * @param {Function}        fn
 * @param {Function|String} message
 * @param {Array}           args
 *
 * examples:
 *  composeRule(isRequired, 'message')
 *  composeRule(isRequired, (value, ...args) => 'message')
 *  composeRule(isMatchRegex, 'message', [/regexp/])
 *  composeRule(isLengthBetween, 'message', [1, 2])
 */
export const composeRule = (fn, message, args = []) => (v) => fn(v, ...args) || (typeof message === 'function' ? message(v, ...args) : message);
/**
 * @param {Function} condition
 * @param {Function} fn
 *
 * examples:
 *  composeConditionalRule(
 *      (value, config) => true,
 *      composeRule(isRequired, 'message')
 *  )
 *  composeConditionalRule(
 *      (value, config) => true,
 *      composeRule(isMatchRegex, 'message', [/regexp/])
 *  )
 *  composeConditionalRule(
 *      (value, config) => true,
 *      composeRule(isLengthBetween, 'message', [1, 2])
 *  )
 */
export const composeConditionalRule = (condition, fn) => (v, c) => !condition(v, c) || fn(v);

export const isRequired = (v) => "" !== v && v !== undefined && v !== null;
export const isMatchRegex = (v, pattern) => {
    if (pattern instanceof RegExp) {
        return pattern.test(v);
    }

    return new RegExp(pattern).test(v);
};
export const isLengthBetween = (v, min, max) => !(min > v.length || max < v.length);
