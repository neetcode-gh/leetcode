/** 
 * https://leetcode.com/problems/find-median-from-data-stream/
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
class MedianFinder {
    constructor () {
        this.maxHeap = new MaxPriorityQueue()
        this.minHeap = new MinPriorityQueue()
    }

    /* Time O(log(N)) | Space (N) */
    insertNum (num) {
        this.addNum(num)
    }

    addNum (num, heap = this.getHeap(num)) {
        heap.enqueue(num)
        this.rebalance()
    }

    getHeap (num, { maxHeap, minHeap } = this) {
        const isFirst = maxHeap.isEmpty()
        const isGreater = num <= this.top(maxHeap);
        const isMaxHeap = (isFirst || isGreater);
        return (isMaxHeap)
            ? maxHeap
            : minHeap
    }

    rebalance ({ maxHeap, minHeap } = this) {
        const canShiftMax = (minHeap.size() + 1) < maxHeap.size()
        if (canShiftMax) return minHeap.enqueue(maxHeap.dequeue().element)

        const canShiftMin = maxHeap.size() < minHeap.size()
        if (canShiftMin) return maxHeap.enqueue(minHeap.dequeue().element)
    }

    /* Time O(1) | Space (1) */
    findMedian ({ maxHeap, minHeap } = this) {
        const isEven = maxHeap.size() === minHeap.size()
        return (isEven)
            ? this.average(maxHeap, minHeap)
            : this.top(maxHeap)
    }

    average (maxHeap, minHeap) {
        return (this.top(maxHeap) + this.top(minHeap)) / 2
    }

    top (heap) {
        return heap.front()?.element || 0
    }
}