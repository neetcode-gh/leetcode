const MedianFinder = function () {
    this.small = new MaxPriorityQueue();
    this.large = new MinPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    this.small.enqueue(num);
    // Ensure every elem in small is <= every num in large
    if (!this.small.isEmpty() && !this.large.isEmpty()
    && this.small.front().element > this.large.front().element) {
        this.large.enqueue(this.small.dequeue().element);
    }
    // If size diff is > 1 => we should balance the two heaps
    if (this.small.size() > this.large.size() + 1) {
        this.large.enqueue(this.small.dequeue().element);
    } else if (this.large.size() > this.small.size() + 1) {
        this.small.enqueue(this.large.dequeue().element);
    }

};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    if (this.small.size() === this.large.size()) {
        return (this.small.front().element + this.large.front().element) / 2;
    }

    return this.small.size() > this.large.size() ? this.small.front().element : this.large.front().element;
};