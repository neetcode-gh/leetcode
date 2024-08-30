class KthLargest {
    backingArray: number[];
    size: number;

    constructor(k: number, nums: number[]) {
        this.backingArray = [];
        this.size = k;
        for(const num of nums) this.add(num)
    }

    add(val: number): number {
        const newLength = this.backingArray.push(val)
        this.shiftUp(newLength - 1);

        if (newLength > this.size) this.pop();

        return this.backingArray[0];
    }

    private pop() {
        this.swap(0, this.backingArray.length - 1)
        this.backingArray.length -= 1;
        this.shiftDown(0)
    }

    private shiftDown(elementIndex: number) {
        let leftChildIndex = elementIndex * 2 + 1;
        let rightChildIndex = elementIndex * 2 + 2;

        while ((leftChildIndex < this.backingArray.length && this.backingArray[leftChildIndex] < this.backingArray[elementIndex])
        || (rightChildIndex < this.backingArray.length && this.backingArray[rightChildIndex] < this.backingArray[elementIndex])) {
            let smallestIndex = leftChildIndex;
            if (rightChildIndex < this.backingArray.length && this.backingArray[rightChildIndex] < this.backingArray[smallestIndex]) {
                smallestIndex = rightChildIndex
            }

            this.swap(elementIndex, smallestIndex);

            elementIndex = smallestIndex;
            leftChildIndex = elementIndex * 2 + 1;
            rightChildIndex = elementIndex * 2 + 2;
        }
    }

    private shiftUp(elementIndex: number) {
        if (elementIndex === 0) return;

        let parentIndex = Math.floor((elementIndex - 1) / 2);
        while (this.backingArray[parentIndex] > this.backingArray[elementIndex]) {
            this.swap(elementIndex, parentIndex);
            elementIndex = parentIndex;
            parentIndex = Math.floor((elementIndex - 1) / 2);
        }
    }

    private swap(indexA: number, indexB: number) {
        const temp = this.backingArray[indexA];
        this.backingArray[indexA] = this.backingArray[indexB];
        this.backingArray[indexB] = temp;
    }
}
