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

function leastInterval(tasks, n) {
  const count = new Map();

  tasks.forEach((task) => {
    if (count.has(task)) {
      count.set(task, count.get(task) + 1);
    } else {
      count.set(task, 1);
    }
  });

  const maxheap = new MaxHeap([...count.values()]);

  let time = 0;
  const q = [];

  while (maxheap.size || q.length) {
    time += 1;

    if (maxheap.size) {
      let count = maxheap.popMax() - 1;
      if (count) {
        q.push([count, time + n]);
      }
    }

    if (q.length && q[0][1] == time) {
      let removed = q.shift();
      if (removed) {
        maxheap.insert(removed[0]);
      }
    }
  }

  return time;
}
