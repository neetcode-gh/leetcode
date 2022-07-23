//////////////////////////////////////////////////////////////////////////////
// Limited Size Min Heap
// KthLargest.prototype.constructor
//     -> Time: Omega(n) Theta(n*log(k)) O(n*log(k))
//     -> Space: Theta(k) O(k)
// KthLargest.prototype.add
//     -> Time: Omega(1) Theta(log(k)) O(log(k))
//     -> Space: Theta(1) O(1)
// This solution works by creating a min heap of the `k` largest values. It is
// the highest performing solution when `k` is noticeably different than
// `nums.length`. If `k` is close to `nums.length` you would modify the
// `MinHeap` constructor to heapify the `nums` array in linear time first and
// then delete the minimum number from the heap until `heap.length` is equal
// to `k`. The modified constructor's time complexity becomes
// Omega(max((n-k)*log(n),n)), Theta(n*log(n)), and O(n*log(n)). While its
// space complexity becomes Theta(n) and O(n).
//////////////////////////////////////////////////////////////////////////////

class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     * @constructor
     */
    constructor(k, nums) {
        this.heap = new MinHeap(nums, k);
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        this.heap.add(val);
        return this.heap.getMin();
    }
}

class MinHeap {
    /**
     * @param {number[]} nums
     * @param {number} size
     * @constructor
     */
    constructor(nums, size) {
        this.size = size;
        this.length = 0;
        this.heap = [];
        for (const num of nums) {
            this.add(num);
        }
    }

    /**
     * @param {number} num
     * @return {void}
     */
    add(num) {
        if (this.length < this.size) {
            ++this.length;
            this.heap.push(num);
            this.siftUp(this.length - 1);
        } else if (num > this.heap[0]) {
            this.heap[0] = num;
            this.siftDown(0);
        }
    }

    /**
     * @return {number}
     */
    getMin() {
        return this.heap[0];
    }

    /**
     * @param {number} i
     * @return {void}
     */
    siftDown(i) {
        const length = this.length;
        const heap = this.heap;
        let k = i * 2 + 1;
        while (k < length) {
            if (k + 1 < length && heap[k + 1] < heap[k]) {
                ++k;
            }
            if (heap[i] <= heap[k]) {
                return;
            }
            [heap[i], heap[k]] = [heap[k], heap[i]];
            i = k;
            k = i * 2 + 1;
        }
    }

    /**
     * @param {number} i
     * @return {void}
     */
    siftUp(i) {
        const heap = this.heap;
        let p = Math.floor((i - 1) / 2);
        while (i > 0 && heap[i] < heap[p]) {
            [heap[i], heap[p]] = [heap[p], heap[i]];
            i = p;
            p = Math.floor((i - 1) / 2);
        }
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

//////////////////////////////////////////////////////////////////////////////
// Sort & Binary Search
// KthLargest.prototype.constructor
//     -> Time: Omega(n) Theta(n*log(n)) O(n*log(n))
//     -> Space: Theta(n) O(n)
// KthLargest.prototype.add
//     -> Time: Omega(1) Theta(n) O(n)
//     -> Space: Theta(1) O(n)
// This solution works by sorting the `nums` array and using binary search to
// add new numbers to the sorted array. It is slower than the limited size
// minimum heap solution.
//////////////////////////////////////////////////////////////////////////////

class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     * @constructor
     */
    constructor(k, nums) {
        this.nums = nums.sort((a, b) => b - a);
        this.k = k;
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        const nums = this.nums;
        let l = 0;
        let r = nums.length;
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            if (val === nums[m]) {
                l = m;
                break;
            }
            if (val < nums[m]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        nums.splice(l, 0, val);
        return nums[this.k - 1];
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
