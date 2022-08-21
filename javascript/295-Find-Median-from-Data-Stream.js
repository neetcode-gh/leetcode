
// Solution using heaps
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


// Other solution

var MedianFinder2 = function() {
    this.array = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder2.prototype.addNum = function(num) {
    var low = 0 ; 
    var high = this.array.length - 1;
    
    while (low <= high) {
        var mid = Math.floor((high + low)/2);

        if (this.array[mid] < num) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    this.array.splice(low, 0, num);
};

/**
 * @return {number}
 */
MedianFinder2.prototype.findMedian = function() {
    if (this.array.length % 2 === 0) {
        var mid = this.array.length / 2;
        return (this.array[mid] + this.array[mid - 1]) / 2;
    } else {
        var mid = Math.floor(this.array.length / 2);
        return this.array[mid];
    }
};

/** 
 * Your MedianFinder2 object will be instantiated and called as such:
 * var obj = new MedianFinder2()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
