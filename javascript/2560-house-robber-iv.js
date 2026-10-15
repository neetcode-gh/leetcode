/**
 * Binary Search
 * Time O(n*log(m)) | Space O(1)
 * https://leetcode.com/problems/house-robber-iv/
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minCapability = function(nums, k) {
    
    const canRob = (max) => {

        let i = 0;
        let count = 0;

        while (i < nums.length) {
            
            if (nums[i] <= max) {
                i += 2;
                count++;
                continue;
            }

            i += 1;
        }

        return count;
    }

    let left = 1;
    let right = Math.max(...nums);
    let minCap = Infinity;

    while (left <= right) {

        const mid = left + Math.floor((right-left)/2);

        if (canRob(mid) >= k) {
            minCap = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return minCap;
};
