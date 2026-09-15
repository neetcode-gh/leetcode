/**
 * Sliding Window
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/alternating-groups-ii
 * @param {number[]} colors
 * @param {number} k
 * @return {number}
 */
var numberOfAlternatingGroups = function(colors, k) {
    
    colors = [...colors, ...colors];
    let left = 0;
    let ptr = 0;
    let count = 0;

    while (left < colors.length/2) {

        if ((ptr - left) + 1 === k) {
            count++;
            left++;
            ptr++;

            if (colors[ptr] === colors[ptr-1]) {
                left = ptr;
            }
            continue;
        }

        ptr++
        if (colors[ptr] === colors[ptr-1]) {
            left = ptr;
        } 
    }

    return count;
};
