/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
    var val = init;
    for (let i = 0; i < nums.length; i++) {
        val = fn(val, nums[i])
    }
    return val;
};


var reduce = function (nums, fn, init) {

    for (let i = 0; i < nums.length; i++) {
        init = fn(init, nums[i])
    }
    return init
};