/**
 * Brute Force - DFS
 * Time O(N^2) | Space O(N)
 * https://leetcode.com/problems/partition-equal-subset-sum/
 * @param {number[]} nums
 * @return {boolean}
 */
 var canPartition = (nums) => {
    const sum = getSum(nums);/* Time O(N) */
    const subSetSum = (sum / 2);

    const isEven = ((sum % 2) === 0);
    if (!isEven) return false;

    const index = (nums.length - 1);

    return dfs(nums, index, subSetSum);
}

var getSum = (nums, sum = 0) => {
    for (const num of nums) (sum += num);/* Time O(N) */

    return sum;
}

var dfs = (nums, index, subSetSum) => {
    const isBaseCase1 = subSetSum === 0;
    if (isBaseCase1) return true;

    const isBaseCase2 = (index === 0) || (subSetSum < 0);
    if (isBaseCase2) return false;

    const difference = (subSetSum - nums[(index - 1)]);

    const left = dfs(nums, (index - 1), difference);
    const right = dfs(nums, (index - 1), subSetSum);

    return (left || right);
}

/**
 * DP - Top Down
 * Matrix - Memo
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/partition-equal-subset-sum/
 * @param {number[]} nums
 * @return {boolean}
 */
 var canPartition = (nums) => {
    const isEmpty = nums.length === 0;
    if (isEmpty) return false;

    const sum = getSum(nums);                 /* Time O(N) */

    const isEven = ((sum % 2) === 0);
    if (!isEven) return false;

    const subSetSum = (sum >> 1);
    const memo = initMemo(nums, subSetSum);        /*               | Space O(N * M) */
    const index = (nums.length - 1);

    return dfs(nums, index, subSetSum, memo);/* Time O(N * M) | Space O(N * M) */
}

var initMemo = (nums, subSetSum) => new Array((nums.length + 1)).fill()/* Space O(N) */
    .map(() => new Array((subSetSum + 1)).fill(null));                     /* Space O(M) */

var dfs = (nums, index, subSetSum, memo) => {
    const isBaseCase1 = (subSetSum === 0);
    if (isBaseCase1) return true;

    const isBaseCase2 = ((index === 0) || (subSetSum < 0));
    if (isBaseCase2) return false;

    const hasSeen = (memo[index][subSetSum] !== null);
    if (hasSeen) return memo[index][subSetSum];

    const difference = (subSetSum - nums[(index - 1)]);

    const left = dfs(nums, (index - 1), difference, memo);
    const right = dfs(nums, (index - 1), subSetSum, memo);

    memo[index][subSetSum] = (left || right);
    return memo[index][subSetSum];
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/partition-equal-subset-sum/
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = (nums) => {
    const isEmpty = nums.length === 0;
    if (isEmpty) return false;

    const sum = getSum(nums);              /* Time O(N) */

    const isEven = ((sum % 2) === 0);
    if (!isEven) return false;

    const subSetSum = (sum >> 1);
    const tabu = initTabu(nums, subSetSum);/*            | Space O(N * M) */

    search(nums, subSetSum, tabu);

    return tabu[nums.length][subSetSum];
}

var getSum = (nums, sum = 0) => {
    for (const num of nums) { sum += num };/* Time O(N) */

    return sum;
}

var initTabu = (nums, subSetSum) => {
    const tabu = new Array((nums.length + 1)).fill()/* Space O(N) */
        .map(() => new Array((subSetSum + 1)).fill(false));/* Space O(M) */

    tabu[0][0] = true;                              /* Space O(N * M) */

    return tabu;
}

var search = (nums, subSetSum, tabu) => {
    for (let numIndex = 1; (numIndex <= nums.length); numIndex++) {/* Time O(N) */
        update(nums, numIndex, subSetSum, tabu);                       /* Time O(N) | Space O(N * M) */
    }
}

var update = (nums, numIndex, subSetSum, tabu) => {
    const num = (numIndex - 1);
    const prevNum = nums[num];

    for (let subSet = 0; subSet <= subSetSum; subSet++) {/* Time O(M) */
        const isNumGreater = (subSet < prevNum);

        tabu[numIndex][subSet] = isNumGreater               /* Space O(N * M) */
            ? (tabu[num][subSet])
            : ((tabu[num][subSet]) || (tabu[num][subSet - prevNum]));
    }
}

/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N * M) | Space O(M)
 * https://leetcode.com/problems/partition-equal-subset-sum/
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = (nums) => {
    const isEmpty = nums.length === 0;
    if (isEmpty) return false;

    const sum = getSum(nums);        /* Time O(N) */

    const isEven = ((sum % 2) === 0);
    if (!isEven) return false;

    const subSetSum = (sum >> 1);
    const tabu = initTabu(subSetSum);/*               | Space O(M) */

    search(nums, subSetSum, tabu);   /* Time O(N * M) | Space O(M) */

    return tabu[subSetSum];
};

var getSum = (nums, sum = 0) => {
    for (const num of nums) { sum += num };/* Time O(N) */

    return sum;
}

var initTabu = (subSetSum) => {
    const tabu = new Array((subSetSum + 1)).fill(false);/* Space O(M) */

    tabu[0] = true;                                     /* Space O(M) */

    return tabu;
}

var search = (nums, subSetSum, tabu) => {
    for (const num of nums) {/* Time O(N) */
        update(num, subSetSum, tabu);/* Time O(M) | Space O(M) */
    }
}

var update = (num, subSetSum, tabu) => {
    for (let subSet = subSetSum; (num <= subSet); subSet--) {/* Time O(M) */
        const difference = (subSet - num);

        tabu[subSet] |= tabu[difference];                        /* Space O(M) */
    }
}
