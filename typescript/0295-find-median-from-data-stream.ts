class MedianFinder {
    private array: number[];

    constructor() {
        this.array = [];
    }

    addNum(num: number): void {
        if (this.array.length === 0) {
            this.array.push(num);
            return;
        }

        let left = 0;
        let right = this.array.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (this.array[mid] === num) {
                this.array.splice(mid, 0, num);
                return;
            }

            if (this.array[mid] > num) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        this.array.splice(left, 0, num);
    }

    findMedian(): number {
        if (this.array.length === 0) {
            return 0;
        }

        const mid = Math.floor(this.array.length / 2);

        if (this.array.length % 2 !== 0) {
            return this.array[mid];
        } else {
            return (this.array[mid] + this.array[mid - 1]) / 2;
        }
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
