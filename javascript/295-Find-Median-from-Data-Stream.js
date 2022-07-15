class MinHeap {
  constructor(nums) {
    this.storage = [];
    this.size = 0;
    if (nums) {
      for (const num of nums) {
        this.insert(num);
      }
    }
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.size;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.size;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
    return this.storage[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.storage[this.getRightChildIndex(index)];
  }

  parent(index) {
    return this.storage[this.getParentIndex(index)];
  }

  getMin() {
    return this.storage[0];
  }

  swap(index1, index2) {
    let temp = this.storage[index1];
    this.storage[index1] = this.storage[index2];
    this.storage[index2] = temp;
  }

  popMin() {
    if (this.size == 0) throw new Error("Empty Heap");
    let data = this.storage[0];
    this.storage[0] = this.storage[this.size - 1];
    this.size -= 1;
    this.heapifyDown(0);
    return data;
  }

  heapifyDown(index) {
    let smallest = index;
    if (
      this.hasLeftChild(index) &&
      this.storage[smallest] > this.leftChild(index)
    )
      smallest = this.getLeftChildIndex(index);
    if (
      this.hasRightChild(index) &&
      this.storage[smallest] > this.rightChild(index)
    )
      smallest = this.getRightChildIndex(index);
    if (smallest != index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  insert(data) {
    this.storage[this.size] = data;
    this.size += 1;
    this.heapifyUp(this.size - 1);
  }

  heapifyUp(index) {
    if (this.hasParent(index) && this.parent(index) > this.storage[index]) {
      this.swap(index, this.getParentIndex(index));
      this.heapifyUp(this.getParentIndex(index));
    }
  }
}

class MaxHeap {
  constructor(nums) {
    this.storage = [];
    this.size = 0;
    if (nums) {
      for (const num of nums) {
        this.insert(num);
      }
    }
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.size;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.size;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
    return this.storage[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.storage[this.getRightChildIndex(index)];
  }

  parent(index) {
    return this.storage[this.getParentIndex(index)];
  }

  getMax() {
    return this.storage[0];
  }

  swap(index1, index2) {
    let temp = this.storage[index1];
    this.storage[index1] = this.storage[index2];
    this.storage[index2] = temp;
  }

  popMax() {
    if (this.size == 0) throw new Error("Empty Heap");
    let data = this.storage[0];
    this.storage[0] = this.storage[this.size - 1];
    this.size -= 1;
    this.heapifyDown(0);
    return data;
  }

  heapifyDown(index) {
    let smallest = index;
    if (
      this.hasLeftChild(index) &&
      this.storage[smallest] < this.leftChild(index)
    )
      smallest = this.getLeftChildIndex(index);
    if (
      this.hasRightChild(index) &&
      this.storage[smallest] < this.rightChild(index)
    )
      smallest = this.getRightChildIndex(index);
    if (smallest != index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  insert(data) {
    this.storage[this.size] = data;
    this.size += 1;
    this.heapifyUp(this.size - 1);
  }

  heapifyUp(index) {
    if (this.hasParent(index) && this.parent(index) < this.storage[index]) {
      this.swap(index, this.getParentIndex(index));
      this.heapifyUp(this.getParentIndex(index));
    }
  }
}

class MedianFinder {
  constructor() {
    this.res = [];
    this.small = new MaxHeap();
    this.large = new MinHeap();
  }

  addNum(num) {
    this.small.insert(num);

    if (
      this.small.size &&
      this.large.size &&
      this.small.getMax() > this.large.getMin()
    ) {
      const val = this.small.popMax();
      this.large.insert(val);
    }

    if (this.small.size > this.large.size + 1) {
      const val = this.small.popMax();
      this.large.insert(val);
    }

    if (this.large.size > this.small.size + 1) {
      const val = this.large.popMin();
      this.small.insert(val);
    }
  }

  findMedian() {
    if (this.small.size > this.large.size) {
      return this.small.getMax();
    }
    if (this.large.size > this.small.size) {
      return this.large.getMin();
    }
    return (this.small.getMax() + this.large.getMin()) / 2;
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
