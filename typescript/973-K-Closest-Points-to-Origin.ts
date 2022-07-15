class MinHeap {
  storage: [number, number, number][];
  size: number;

  constructor(nums: [number, number, number][]) {
    this.storage = [];
    this.size = 0;
    if (nums) {
      for (const num of nums) {
        this.insert(num);
      }
    }
  }

  private getLeftChildIndex(index: number) {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number) {
    return 2 * index + 2;
  }

  private getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private hasLeftChild(index: number) {
    return this.getLeftChildIndex(index) < this.size;
  }

  private hasRightChild(index: number) {
    return this.getRightChildIndex(index) < this.size;
  }

  private hasParent(index: number) {
    return this.getParentIndex(index) >= 0;
  }

  private leftChild(index: number) {
    return this.storage[this.getLeftChildIndex(index)][0];
  }

  private rightChild(index: number) {
    return this.storage[this.getRightChildIndex(index)][0];
  }

  private parent(index: number) {
    return this.storage[this.getParentIndex(index)][0];
  }

  getMin() {
    return this.storage[0];
  }

  private swap(index1: number, index2: number) {
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

  private heapifyDown(index: number) {
    let smallest = index;
    if (
      this.hasLeftChild(index) &&
      this.storage[smallest][0] > this.leftChild(index)
    )
      smallest = this.getLeftChildIndex(index);
    if (
      this.hasRightChild(index) &&
      this.storage[smallest][0] > this.rightChild(index)
    )
      smallest = this.getRightChildIndex(index);
    if (smallest != index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  insert(data: [number, number, number]) {
    this.storage[this.size] = data;
    this.size += 1;
    this.heapifyUp(this.size - 1);
  }

  private heapifyUp(index: number) {
    if (this.hasParent(index) && this.parent(index) > this.storage[index][0]) {
      this.swap(index, this.getParentIndex(index));
      this.heapifyUp(this.getParentIndex(index));
    }
  }
}

function kClosest(points: number[][], k: number): number[][] {
  const minHeap = new MinHeap([]);
  for (const [x, y] of points) {
    let dist = x * x + y * y;
    minHeap.insert([dist, x, y]);
  }

  const res: [number, number][] = [];
  while (k > 0) {
    const [dist, x, y] = minHeap.popMin();
    res.push([x, y]);
    k -= 1;
  }

  return res;
}
