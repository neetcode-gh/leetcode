/**
 * @param {number[]} nums
 * @param {number} target
 * Time O(N) || Space O(N)
 * @return {number[]}
 */
var twoSum = (nums, target, map = new Map()) => {
    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];
        const complement = target - num;

        if (map.has(complement)) {
            const sumIndex = map.get(complement);

            return [ index, sumIndex ]
        }

        map.set(num, index);
    }
    
    return [ -1, -1 ]
}