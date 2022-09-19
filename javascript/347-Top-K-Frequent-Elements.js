/**
 * Hash Map - Frequency Counter
 * Matrix - Bucket
 * Time O(N^2) | Space O(N^2)
 * https://leetcode.com/problems/top-k-frequent-elements/
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = (nums, k) => {
    const map = getFrequencyMap(nums);  /* Time O(N)   | Space O(N) */
    const bucket = getBucket(nums, map);/* Time O(N)   | Space O(N^2) */

    return getTopK(bucket, k);          /* Time O(N^2) | Space O(K) */
};

var getFrequencyMap = (nums, map = new Map()) => {
    for (const num of nums) {/* Time O(N) */
        const count = (map.get(num) || 0) + 1;

        map.set(num, count);     /* Space O(N) */
    }

    return map;
};

const getBucket = (nums, map) => {
    const bucket = new Array(nums.length + 1).fill()
        .map(() => []);

    for (const [ num, count ] of map.entries()) {/* Time O(N) */
        bucket[count].push(num);                     /* Space O(N * N) */
    }

    return bucket.reverse();                     /* Time O(N) */
};

var getTopK = (bucket, k, topK = []) => {
    for (const count of bucket) {/* Time O(N) */
        for (const num of count) {   /* Time O(N) */
            const isAtCapacity = topK.length === k;
            if (isAtCapacity) break;

            topK.push(num);               /* Space O(K) */
        }
    }

    return topK;
};

/**
 * Hash Map - Frequency Counter
 * Heap - Min Priority Queue
 * Time O(N * log(K)) | Space O(N + K)
 * https://leetcode.com/problems/top-k-frequent-elements/
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = (nums, k) => {
    const isAtCapacity = k === nums.length
    if (isAtCapacity) return nums;

    const map = getFrequencyMap(nums); /* Time O(N)          | Space O(N) */
    const minHeap = getMinHeap(map, k);/* Time O(N * log(K)) | Space O(K) */

    return getTopK(minHeap, k);        /* Time O(K * log(K)) | Space O(K) */
}


var getFrequencyMap = (nums, map = new Map()) => {
    for (const num of nums) {/* Time O(N) */
        const count = (map.get(num) || 0) + 1;

        map.set(num, count);/* Space O(N) */
    }

    return map;
};

const getMinHeap = (map, k) => {
    const minHeap = new MinPriorityQueue({ priority: ([ num, count ]) => count });

    for (const [ num, count ] of map.entries()) {/* Time O(N) */
        minHeap.enqueue([ num, count ]);              /* Time O(log(K))) | Space O(K) */

        const isOverCapacity = k < minHeap.size();
        if (isOverCapacity) minHeap.dequeue();          /* Time O(log(K))) */
    }

    return minHeap;
}

var getTopK = (minHeap, k, topK = []) => {
    while (k) {/* Time O(K) */
        const [ num, count ] = minHeap
            .dequeue().element;/* Time O(log(K))) */

        topK.push(num);        /* Space O(K) */
        k--;
    }

    return topK
}

/**
 * Hash Map - Frequency Counter
 * Sort - Quick Select - Average Time O(N) | Worst Time O(N^2)
 * Time O(N^2) | Space O(N)
 * https://leetcode.com/problems/top-k-frequent-elements/
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = (nums, k) => {
    const map = getFrequencyMap(nums);                     /* Time O(N)        | Space O(N) */
    const distinctNums = [ ...map.keys() ];                /* Time O(N)        | Space O(N) */
    const [ left, right, kSmallest ] = [ 0, (map.size - 1), (map.size - k) ];

    quickselect(left, right, kSmallest, distinctNums, map);/* Time O(N || N^2) | Space O(log(N)) */

    const [ start, end ] = [ kSmallest, map.size ];
    const topK = distinctNums.slice(start, end);           /* Time O(K)        | Space O(K) */

    return topK;
}

var getFrequencyMap = (nums, map = new Map) => {
    for (const num of nums) {/* Time O(N) */
        const count = (map.get(num) || 0) + 1;

        map.set(num, count);     /* Space O(N) */
    }

    return map;
};

const quickselect = (left, right, kSmallest, nums, map) => {
    const isBaseCase = left === right;
    if (isBaseCase) return;

    const mid = partition(left, right, nums, map);/* Time O(N) */

    const isTarget = mid === kSmallest;
    if (isTarget) return;

    const isTargetGreater = mid < kSmallest;
    if (isTargetGreater) quickselect(          /* Time O(N * N) | Space O(log(N)) */
        (mid + 1), right, kSmallest, nums, map
    );

    const isTargetLess = kSmallest < mid;
    if (isTargetLess) quickselect(             /* Time O(N * N) | Space O(log(N)) */
        left, (mid - 1), kSmallest, nums, map
    );
    
}

const partition = (left, right, nums, map) => {
    const mid = (left + right) >> 1;
    const guess = nums[mid];
    const count = map.get(guess);

    swap(nums, mid, right);

    const pivot = getPivot(left, right, count, nums, map);/* Time O(N) */

    swap(nums, pivot, right);

    return pivot;
}

const swap = (arr, left, right) => [ arr[left], arr[right] ] = [ arr[right], arr[left] ];

const getPivot = (left, right, count, nums, map, pivot = left) => {
    for (let index = left; index <= right; index++) {/* Time O(N) */
        const num = nums[index];
        const numCount = map.get(num);

        const canSkip = count <= numCount;
        if (canSkip) continue;

        swap(nums, pivot, index);
        pivot++;
    }

    return pivot;
}