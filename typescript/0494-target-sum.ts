function findTargetSumWays(nums: number[], target: number): number {
    // key: index, sum till index element, value: number of ways to get to that sum
    const cache = new Map();

    const backTrack = (i, sum) => {
        /*  if we're at the last element + 1 we compare the sum to our target
            if it's true, we've found a way to our sum!
        */
        if (i === nums.length) {
            if (sum === target) {
                return 1;
            }
            return 0;
        }

        // if already index, sum pair exist in our HashMap, we return the memoized result
        if (cache.has(`${i},${sum}`)) {
            return cache.get(`${i},${sum}`);
        }

        // DP: we memoize number of ways of each pair index, sum
        cache.set(
            `${i},${sum}`,
            backTrack(i + 1, sum + nums[i]) + backTrack(i + 1, sum - nums[i])
        );

        return cache.get(`${i},${sum}`);
    };

    return backTrack(0, 0);
}


/**
 * DP - Bottom Up
 * Time O(N * M) | Space O(M)
 * https://leetcode.com/problems/target-sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findTargetSumWays(nums: number[], target: number): number {
    const total = nums.reduce((a, b) => a + b);
    const m = total * 2 + 1;
    let dp = new Array(m).fill(0);
    dp[total] = 1; // base case

    for (let i = 0; i < nums.length; i++) {
        const current = new Array(m);
        const num = nums[i];

        for (let j = 0; j < current.length; j++) {
            const left = dp[j - num] ?? 0;
            const right = dp[j + num] ?? 0;

            current[j] = left + right;
        }
        dp = current;
    }

    return dp[total + target] ?? 0;
};
