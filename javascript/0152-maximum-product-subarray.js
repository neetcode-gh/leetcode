/**
 * Brute Force - Linear Search
 * Time O(N^2) | Space O(1)
 * https://leetcode.com/problems/maximum-product-subarray/
 * @param {number[]} nums
 * @return {number}
 */
 var maxProduct = (nums) => {
    const isEmpty = nums.length === 0;
    if (isEmpty) return 0;

    return linearSearch(nums);/* Time O(N * N) */
}

const linearSearch = (nums, max = nums[0]) => {
    for (let index = 0; index < nums.length; index++) {/* Time O(N) */
        max = getMax(nums, index, max);                    /* Time O(N) */
    }

    return max;
}

const getMax = (nums, index, max, product = 1) => {
    for (let num = index; num < nums.length; num++) {/* Time O(N) */
        product *= nums[num];
        max = Math.max(max, product);
    }

    return max;
}

/**
 * Greedy - product
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/maximum-product-subarray/
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = (nums) => {
    const isEmpty = nums.length === 0;
    if (isEmpty) return 0;

    return greedySearch(nums);/* Time O(N) */
};

const greedySearch = (nums) => {
    let min = max = product = nums[0];

    for (let num = 1; num < nums.length; num++) {/* Time O(N) */
        const [ minProduct, maxProduct ] = [ (min * nums[num]), (max * nums[num]) ];

        min = Math.min(maxProduct, minProduct, nums[num]);
        max = Math.max(maxProduct, minProduct, nums[num]);

        product = Math.max(product, max);
    }

    return product;
}