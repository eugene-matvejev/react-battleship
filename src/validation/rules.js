const composeRule = (fn, errorMsg, ...args) => (c, v) => fn(v, ...args) || typeof errorMsg === 'function' ? errorMsg(c, v, ...args) : errorMsg;

const composeCustomRule


const isRequired = (c, v) => !!v || v !== false;
const isMatchRegex = (c, v, [regex]) => {

};
const isLenghBetween = (c, v, [ min, max ]) => {
    if (min && max ) {
        return  min >= v.length && v.length <= max;
    }
    if ( min )
}
