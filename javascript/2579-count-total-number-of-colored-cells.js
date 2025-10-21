/**
 * Brute Force | Math
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/count-total-number-of-colored-cells
 * @param {number} n
 * @return {number}
 */
var coloredCells = function(n) {

    let total = 1;
    n--;
    while (n) {
        total += 4*n;
        n--;
    }
    return total;
};
