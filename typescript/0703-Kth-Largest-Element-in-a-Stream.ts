class KthLargest {
    k: number
    minHeap: number[]

    constructor(k: number, nums: number[]) {
        this.k = k
        this.minHeap = nums.sort((a, b) => b - a).slice(0, k)
    }

    add(val: number): number {
        let i = 0;
        while (i < this.k && val < this.minHeap[i]) i++
        this.minHeap.splice(i, 0, val);

        if (this.minHeap.length > this.k) {
            this.minHeap.pop()
        }

        return this.minHeap[this.k - 1]
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */