/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
    return function (x) {
        let ans = x;
        for (fn of functions.reverse())
            ans = fn(ans);
        return ans;
    }
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
