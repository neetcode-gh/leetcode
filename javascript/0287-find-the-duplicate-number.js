/**
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Time O(N * log(N)) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    nums.sort((a, b) => a - b);/* Time O(N * log(N)) | HeapSort Space O(1) | QuickSort Space O(log(N)) */

    for (let i = 1; i < nums.length; i++) {/* Time O(N) */
        const isPrevDuplicate = nums[i - 1] === nums[i]
        if (isPrevDuplicate) return nums[i];
    }

    return -1;
}

/**
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Time O(N * log(N)) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let [ left, right, duplicate ] = [ 1, (nums.length - 1), -1 ];

    while (left <= right) {/* Time O(log(N)) */
        const mid = (left + right) >> 1;
        const count = getCount(mid, nums);/* Time O(N) */
    
        const isMidGreater = count <= mid
        if (isMidGreater) left = mid + 1;

        const isMidLess = mid < count
        if (isMidLess) {
            duplicate = mid;
            right = mid - 1;
        }
    }

    return duplicate;
}

const getCount = (mid, nums, count = 0) => {
    for (const num of nums) {/* Time O(N) */
        const isMidGreater = num <= mid
        if (isMidGreater) count++;
    }

    return count;
}

/**
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Time O(N * log(N)) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums, duplicate = 0) {
    const mostSignificantBit = calcMaxBit(nums);        /* Time O(N) */

    for (let bit = 0; bit < mostSignificantBit; bit++) {/* Time O(log(N)) */
        const [ baseCount, numsCount, mask ] = count(nums, bit);/* Time O(N) */

        const isMoreFrequentlySet = baseCount < numsCount
        if (isMoreFrequentlySet) duplicate |= mask;
    }

    return duplicate;
}

const calcMaxBit = (nums, bits = 0) => {
    let max = Math.max(0, ...nums);/* Time O(N) */

    while (max) {/* Time O(log(MAX)) */
        max >>= 1;
        bits++;
    }

    return bits;
}

const count = (nums, bit) => {
    let [ baseCount, numsCount, mask ] = [ 0, 0, (1 << bit) ];

    for (let i = 0; i < nums.length; i++) {/* Time O(N) */
        const isBaseBitSet = 0 < (i & mask);
        if (isBaseBitSet) baseCount++;

        const isNumBitSet = 0 < (nums[i] & mask);
        if (isNumBitSet) numsCount++;
    }

    return [ baseCount, numsCount, mask ];
}

/**
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Time O(N) | Space O(N)
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums, curr = 0) {
    const isBaseCase = curr === nums[curr]
    if (isBaseCase) return curr;

    const next = nums[curr];

    nums[curr] = curr;

    return findDuplicate(nums, next);/* Time O(N) | Space O(N) */
}

/**
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Time O(N) | Space O(N)
 * @param {number[]} nums
 * @return {number}
 */
 var findDuplicate = function(nums, seen = new Set()) {
    for (const num of nums) {/* Time O(N) */
        if (seen.has(num)) return num;

        seen.add(num);              /* Space O(N) */
    }

    return -1;
}

/**
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Time O(N) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    cyclicSort(nums);                                 /* Time O(N) */

    return search(nums);                              /* Time O(N) */
}

const cyclicSort = (nums, index = 0) => {
    const swap = (arr, a, b) => [arr[a], arr[b]] = [arr[b], arr[a]];

    while (index < nums.length) {                     /* Time O(N) */
        const [ num, arrayIndex, arrayNum ] = [ nums[index], (nums[index] - 1), nums[(nums[index] - 1)] ];

        const canSwap = !isSame(num, arrayNum);
        if (canSwap) {
            swap(nums, index, arrayIndex);

            continue;
        }

        index++;
    }
}
const isSame = (a, b) => a === b;

const search = (nums) => {
    for (let index = 0; index < nums.length; index++) {/* Time O(N) */
        const [ num, arrayIndex ] = [ nums[index], (index + 1) ];

        if (!isSame(num, arrayIndex)) return num;
    }

    return nums.length;
}

/**
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Time O(N) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    const duplicate = negativeMarking(nums);/* Time O(N) */

    restoreToPositiveNumbers(nums);         /* Time O(N) */

    return duplicate;
}

const negativeMarking = (nums) => {
    for (let i = 0; i < nums.length; i++) {/* Time O(N) */
        const curr = Math.abs(nums[i]);

        const isNegative = nums[curr] < 0;
        if (isNegative) return curr;

        nums[curr] *= -1;
    }

    return -1
}

const restoreToPositiveNumbers = (nums) => {
    for (let i = 0; i < nums.length; i++) {/* Time O(N) */
        nums[i] = Math.abs(nums[i]);
    }
}

/**
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Time O(N) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
 var findDuplicate = function(nums, start = 0) {
    const swap = (arr, a, b) => [arr[a], arr[b]] = [arr[b], arr[a]];

    const isSame = () => nums[start] === nums[nums[start]];
    while (!isSame()) {/* Time O(N) */
        swap(nums, start, nums[start]);
    }

    return nums[start];
}

/**
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Time O(N) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
 var findDuplicate = function(nums) {
    if (!nums.length) return -1

    let [ slow, fast ] = moveFast(nums);  /* Time O(N) */
    [ slow, fast ] = moveSlow(nums, slow, fast);/* Time O(N) */

    return slow;
};

const moveFast = (nums, start = 0) => {
    let [ slow, fast ] = [ nums[start], nums[nums[start]] ];

    const isSame = () => slow === fast;
    while (!isSame()) {                   /* Time O(N) */
        slow = nums[slow];
        fast = nums[nums[fast]];
    }

    fast = start;

    return [ slow, fast ];
}

const moveSlow = (nums, slow, fast) => {
    const isSame = () => slow === fast;
    while (!isSame()) {                 /* Time O(N) */
        slow = nums[slow];
        fast = nums[fast];
    }

    return [ slow, fast ];
}