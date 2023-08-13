/*
    * Time Complexity: O(logn)
    * Space Complexity: O(n)
*/

class MedianFinder {
    public minHeap;
    public maxHeap;

    constructor() {
        this.minHeap = new MinPriorityQueue();
        this.maxHeap = new MaxPriorityQueue();
    }

    addNum(num: number): void {
        this.getHeap(num).enqueue(num);
        this.rebalance();
    }

    findMedian(): number {
        if (this.minHeap.size() === this.maxHeap.size()) {
            return (this.minHeap.front().element + this.maxHeap.front().element) / 2;
        }

        return this.maxHeap.front().element;
    }

    rebalance() {
        if (this.minHeap.size() + 1 < this.maxHeap.size()) {
            return this.minHeap.enqueue(this.maxHeap.dequeue().element);
        }

        if (this.maxHeap.size() < this.minHeap.size()) {
            return this.maxHeap.enqueue(this.minHeap.dequeue().element);
        }
    }

    getHeap(num: number) {
        if (this.maxHeap.isEmpty() || num <= this.maxHeap.front().element) {
            return this.maxHeap;
        }

        return this.minHeap;
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
