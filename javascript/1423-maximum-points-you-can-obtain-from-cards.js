/**
 * Greedy | Sliding Window | PrefixSum 
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {
    
    const total = cardPoints.reduce((acc, curr) => acc + curr, 0);
    let currTotal = cardPoints.slice(0, cardPoints.length - k).reduce((acc, curr) => acc + curr, 0);
    let max = total - currTotal;
    
    let left = 0;
    let right = cardPoints.length - k - 1; // -1 because the array is 0 indexed.

    while (right < cardPoints.length) {
        currTotal -= cardPoints[left];
        left++;
        right++;
        if (right < cardPoints.length) {
            currTotal += cardPoints[right];
            max = Math.max(max, total - currTotal);
        }
    }

    return max;
};
