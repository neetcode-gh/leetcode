var MedianFinder = function () {
    this.array = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    var low = 0;
    var high = this.array.length - 1;

    while (low <= high) {
        var mid = Math.floor((high + low) / 2);

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
MedianFinder.prototype.findMedian = function () {
    if (this.array.length % 2 === 0) {
        var mid = this.array.length / 2;
        return (this.array[mid] + this.array[mid - 1]) / 2;
    } else {
        var mid = Math.floor(this.array.length / 2);
        return this.array[mid];
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
