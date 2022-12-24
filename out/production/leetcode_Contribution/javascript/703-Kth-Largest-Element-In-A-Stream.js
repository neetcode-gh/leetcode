/** 
 * https://leetcode.com/problems/kth-largest-element-in-a-stream/
 * Time O(N * (K * log(K))) | Space O(K)
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
 class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     * @constructor
     */
    constructor(k, nums) {
        this.k = k
        this.minHeap = new MinPriorityQueue();

        nums.forEach((num) => this.add(num))
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val, { minHeap } = this) {
        const isUnderCapacity = minHeap.size() < this.k;
        if (isUnderCapacity) {
            minHeap.enqueue(val);
        
            return this.top();
        }

        const isLarger = this.top() < val;
        if (isLarger) {
            minHeap.dequeue()
            minHeap.enqueue(val);
        }
        
        return this.top();
    }

    top ({ minHeap } = this) {
        return minHeap.front()?.element || 0
    }
}

