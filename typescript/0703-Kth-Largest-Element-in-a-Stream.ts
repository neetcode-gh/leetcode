// partial implementation of min heap (not exit in ts) 
class MinHeap<T> {
    heap: T[];
    constructor() { this.heap = []; }
 
    // get indecies
    getLeftChildIndex(parentIndex: number) { return 2 * parentIndex + 1; }
    getRightChildIndex(parentIndex: number) { return 2 * parentIndex + 2; }
    getParentIndex(childIndex: number) { return Math.floor((childIndex - 1) / 2); }

    // check existens
    hasLeftChild(index: number) { return this.getLeftChildIndex(index) < this.heap.length; }
    hasRightChild(index: number) { return this.getRightChildIndex(index) < this.heap.length; }
    hasParent(index: number) { return this.getParentIndex(index) >= 0; }
    
    // get items
    leftChild(index: number) { return this.heap[this.getLeftChildIndex(index)]; }
    rightChild(index: number) { return this.heap[this.getRightChildIndex(index)]; }
    parent(index: number) { return this.heap[this.getParentIndex(index)]; }
 
    len() { return this.heap.length }

    swap(indexOne: number, indexTwo: number) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }
 
    peek() {
        if (this.heap.length === 0) return null;
        return this.heap[0];
    }
     
    remove() {
        if (this.heap.length === 0) return null;
        
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();

        this.heapifyDown();
        
        return item;
    }
 
    add(item: T) {
        this.heap.push(item);
        this.heapifyUp();
    }
 
    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
 
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            
            index = smallerChildIndex;
        }
    }
}
 

class KthLargest {
    k: number
    minHeap: MinHeap<number>

    constructor(k: number, nums: number[]) {
        this.k = k
        this.minHeap = new MinHeap()

        for (let i = 0; i < nums.length; i++) {
            this.minHeap.add(nums[i])
        }

        while (this.minHeap.len() > k) {
            this.minHeap.remove()
        }
    }

    add(val: number): number {
        this.minHeap.add(val);

        if (this.minHeap.len() > this.k) {
            this.minHeap.remove()
        }

        return this.minHeap.peek()
    }
}

// without minHeap implementation
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
