/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
    ans = init;
    for (let n of nums)
        ans = fn(ans, n);
    return ans;
};
