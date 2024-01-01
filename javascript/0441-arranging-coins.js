/**
 * https://leetcode.com/problems/arranging-coins/
 * Linear time
 * Time O(n) | Space O(1)
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
    
    let steps = 1;
    let canBuild = 0;

    while(n >= steps) {
        n = n - steps;
        canBuild++;
        steps++;
    }

    return canBuild || 1;
};

/**
 * Binary Search
 * Time O(log(n)) | Space O(1)
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
    
    let left = 1;
    let right = n;
    let result = 0;
  
    while(left <= right) {
  
        const mid = Math.floor((right+left)/2);
        const total = (1 + mid) * (mid/2);
        if(n < total) {
            right = mid -1;
        } else {
            left = mid+1;
            result = Math.max(result, mid);
        }
    }
  
    return result;
  };
  
/** 
 * Math 
 * Time O(1) | Space O(1)
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
  let discriminant = 1 + 8 * n;
  let sqrtDiscriminant = Math.sqrt(discriminant);

  let result1 = Math.floor((-1 + sqrtDiscriminant) / 2);
  let result2 = Math.floor((-1 - sqrtDiscriminant) / 2);

  return Math.max(result1, result2);
};
