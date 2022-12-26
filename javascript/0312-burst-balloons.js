/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(N^3) | Space O(N^2)
 * https://leetcode.com/problems/burst-balloons/
 * @param {number[]} nums
 * @return {number}
 */
 var maxCoins = (nums) => {
    const _nums = [ 1, ...nums, 1 ];/* Time O(N)         | Space O(N) */

    return search(_nums);           /* Time O(N * N * N) | Space O((N * N) + HEIGHT) */
}

var search = (nums, left = 1 , right = (nums.length - 2), memo = initMemo(nums)) => {
    const isBaseCase = (right - left < 0);
    if (isBaseCase) return 0;

    const hasSeen = (memo[left][right] !== -1);
    if (hasSeen) return memo[left][right];

    return dfs(nums, left, right, memo);/* Time O(N * N * N) | Space O((N * N) + HEIGHT) */
}

var initMemo = (nums) => new Array(nums.length).fill()/* Time O(N) | Space O(N) */
    .map(() => new Array(nums.length).fill(-1));          /* Time O(N) | Space O(N) */

var dfs = (nums, left, right, memo, result = 0) => {
    for (let i = left; (i <= right); i++) {/* Time O(N) */
        const gain = ((nums[left - 1] * nums[i]) * nums[right + 1]);
        const _left = search(nums, left, (i - 1), memo);  /* Time O(N * N) | Space O(HEIGHT) */
        const _right = search(nums, (i + 1), right, memo);/* Time O(N * N) | Space O(HEIGHT) */
        const remaining = (_left + _right);

        result = Math.max(result, remaining + gain);
    }

    memo[left][right] = result;           /*                               | Space O(N * N) */
    return result;
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N^3) | Space O(N^2)
 * https://leetcode.com/problems/burst-balloons/
 * @param {number[]} nums
 * @return {number}
 */
 var maxCoins = (nums) => {
    const tabu = initTabu(nums);/* Time O(N * N)     | Space O(N * N) */

    search(nums, tabu);         /* Time O(N * N * N) | Space O(N * N) */

    return tabu[1][(nums.length)];
}

var initTabu = (nums) => new Array(nums.length + 2).fill()/* Time O(N) | Space O(N) */
    .map(() => new Array(nums.length + 2).fill(0))            /* Time O(N) | Space O(N) */

var search = (nums, tabu) => {
    const _nums = [ 1, ...nums, 1 ];                         /* Time O(N) | Space O(N) */
    
    for (let left = nums.length; (1 <= left); left--) {      /* Time O(N) */
        for (let right = left; (right <= nums.length); right++) {/* Time O(N) */
            for (let i = left; (i <= right); i++) {
                const gain = ((_nums[left - 1] * _nums[i]) * _nums[right + 1]);
                const remaining = (tabu[left][i - 1] + tabu[i + 1][right]);

                tabu[left][right] =                                  /*   | Space O(N * N) */
                    Math.max(remaining + gain, tabu[left][right]);
            }
        }
    }
}