/**
 * @param {Function} fn
 * @return {Function}
 */
var curry = function (fn) {
    let accum = [];
    return function curried(...args) {
        for (let arg of args)
            accum.push(arg);
        if (accum.length === fn.length)
            return fn(...accum);
        return curried;
    }
};

/**
 * function sum(a, b) { return a + b; }
 * const csum = curry(sum);
 * csum(1)(2) // 3
 */
