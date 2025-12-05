/**
 * Sliding Window
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function(blocks, k) {
    
    let whiteCount = 0;
    for (let i = 0; i < k; i++) {
        if (blocks[i] === "W") whiteCount++;
    }

    let left = 0;
    let right = k-1;

    let min = Infinity;
    while (right < blocks.length) {
        min = Math.min(min, whiteCount);
        
        if (blocks[left] === "W") whiteCount--;
        left++;
        right++;
        if (right < blocks.length && blocks[right] === "W") whiteCount++;
    }

    return min;
};

