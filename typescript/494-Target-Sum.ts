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
        cache.set(`${i},${sum}`, backTrack(i + 1, sum + nums[i]) + backTrack(i + 1, sum - nums[i]));

        return cache.get(`${i},${sum}`);
    };

    return backTrack(0, 0);
};