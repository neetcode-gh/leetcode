/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
    let largest = nums
        .map((n) => n.toString())
        .sort((x, y) => y + x - (x + y))
        .join('');
    return largest[0] === '0' ? '0' : largest;
};
