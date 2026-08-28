/**
 * Hashing | Combinotorics 
 * Time O(n^2) | Space O(n^2)
 * https://leetcode.com/problems/tuple-with-same-product
 * @param {number[]} nums
 * @return {number}
 */
var tupleSameProduct = function(nums) {
    
    const productFreq = {};

    const getCombinationOf2 = (n) => (n*(n-1))/2;

    for (let i = 0; i < nums.length; i++) {
        for (let j = i+1; j < nums.length; j++) {
            const product = nums[i] * nums[j];
            productFreq[product] = productFreq[product] && productFreq[product] + 1 || 1;
        }
    }

    
    let total = 0;
    for (const prod in productFreq) {

        const pairs = productFreq[prod];
        total += 8 * getCombinationOf2(pairs);
    }

    return total;
};
