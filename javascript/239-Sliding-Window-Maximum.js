/**
 * https://leetcode.com/problems/sliding-window-maximum/
 * Time O(N * K) | Space O(N)
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function (nums, k) {
    const isZero = (nums.length * k) === 0;
    if (isZero) return [];

    return bruteForce(nums, k);
}

const bruteForce = (nums, k) => {
    const size = (nums.length - k) + 1
    const maxWindows = new Array(size).fill(0);

    for (let i = 0; i < size; i++) {/* Time O(N) */
        let max = -Infinity;
    
        for(let j = i; j < (i + k); j++) {/* Time O(K) */
            max = Math.max(max, nums[j]);
        }

        maxWindows[i] = max;             /* Space O(N) */
    }

    return maxWindows;
}

/**
 * https://leetcode.com/problems/sliding-window-maximum/
 * Time O(N) | Space O(N + K)
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k, dequeue = new Dequeue(), maxWindows = []) {
    let [ left, right ] = [ 0, 0 ];

    while (right < nums.length) {/* Time O(N) */
        shrinkTail(nums, dequeue, right);/* Time O(K) */
        dequeue.enqueueTail(right);      /* Space O(K) */

        const isLess = dequeue.head.value < left;
        if (isLess) dequeue.dequeueHead();

        const canSlide = k <= (right + 1);
        if (canSlide) {
            const max = nums[dequeue.head.value];

            maxWindows.push(max);        /* Space O(N) */
            left++;
        }

        right++;
    }

    return maxWindows;
};

const shrinkTail = (nums, dequeue, right) => {
    const isGreater = () => dequeue.tail && nums[dequeue.tail.value] < nums[right]
    while (isGreater()) dequeue.dequeueTail();
}

class Node {
    constructor (value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class Dequeue {
    constructor () {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    isEmpty () { return this.size === 0 }

    setDequeue (node) {
        this.head = node;
        this.tail = node;
    }

    setTail (node) {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    setHead (node) {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    setNode (value, isHead, isTail) {
        const node = new Node(value);
    
        if (this.isEmpty()) return this.setDequeue(node);
        if (isHead) return this.setHead(node);
        if (isTail) return this.setTail(node);
    }

    enqueueNode (value, isHead, isTail) {
        this.setNode(value, isHead, isTail);
        this.size++;
    }

    enqueueTail (value, isHead = false, isTail = true) {
        return this.enqueueNode(value, isHead, isTail);
    };

    enqueueHead (value, isHead = true, isTail = false) {
        return this.enqueueNode(value, isHead, isTail);
    };

    getNode (isHead, isTail) {
        if (this.isEmpty()) return null;
        if (isHead) return this.head;
        if (isTail) return this.tail;
    }

    dequeueNode (isHead, isTail) {
        const node = this.getNode(isHead, isTail);

        if (isHead) {
            this.head = this.head.next;

            const hasNext = this.head;
            if (hasNext) this.head.prev = null;
        }

        if (isTail) {
            this.tail = this.tail.prev;

            const hasPrev = this.tail;
            if (hasPrev) this.tail.next = null;
    
        }

        this.size--;

        return node;
    }

    dequeueHead (isHead = true, isTail = false) {
        return this.dequeueNode(isHead, isTail);
    }

    dequeueTail (isHead = false, isTail = true) {
        return this.dequeueNode(isHead, isTail);
    };
}

/**
 * https://leetcode.com/problems/sliding-window-maximum/
 * Time O(N) | Space O(N)
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    const isZero = (nums.length  * k) === 0;
    if (isZero) return [];
    
    const isOne = k === 1;
    if (isOne) return nums;

    return slideWindow(nums, k);
}

const slideWindow = (nums, k) => {
    const { head, tail } = getPointers(nums);

    dp(nums, k, head, tail);

    return getOutput(head, tail, nums.length, k);
}

const getPointers = (nums) => {
    const [ head, tail ] = new Array(2)
        .fill().map(() => new Array(nums.length).fill(0));
    
    head[0] = nums[0];
    tail[nums.length - 1] = nums[nums.length - 1];
    
    return { head, tail };
}

const dp = (nums, k, head, tail) => {
    for (let i = 1; i < nums.length; i++) {/* Time O(N) */
        const j = (nums.length - i) - 1;

        const isKFactorOfI = (i % k) === 0;
        head[i] = isKFactorOfI            /* Space O(N) */
            ? nums[i]
            : Math.max(head[i - 1], nums[i])

        const isKFactorOfJ = ((j + 1) % k) === 0;
        tail[j] = isKFactorOfJ            /* Space O(N) */
            ? nums[j]
            : Math.max(tail[j + 1], nums[j]);
    }
}

const getOutput = (head, tail, n, k) => {
    const output = new Array((n - k) + 1).fill(0);

    for (let i = 0; i < ((n - k) + 1); i++) {/* Time O(N) */
        const [ headNode, tailNode ] = [ (head[(i + k) - 1]), tail[i] ];

        output[i] = Math.max(headNode, tailNode);/* Space O(N) */
    }

    return output;
}