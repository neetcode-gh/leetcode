/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
    let stack = []; // [num, minLeft]
    let curMin = nums[0];

    for (n of nums.slice(1)) {
        while (stack.length > 0 && n >= stack.at(-1)[0]) {
            stack.pop();
        }
        if (stack.length > 0 && n > stack.at(-1)[1]) {
            return true;
        }

        stack.push([n, curMin]);
        curMin = Math.min(curMin, n);
    }

    return false;
};
