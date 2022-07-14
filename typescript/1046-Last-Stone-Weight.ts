class MaxHeap {
  heap: number[]
  constructor(array: number[]) {
    this.heap = this.buildHeap(array)
  }

  buildHeap(array: number[]) {
    let parentIdx = Math.floor((array.length - 2) / 2)
    for (let i = parentIdx; i >= 0; i--) {
      this.siftDown(i, array.length - 1, array)
    }
    return array
  }

  siftDown(idx: number, endIdx: number, heap: number[]) {
    let childOneIdx = 2 * idx + 1

    while (childOneIdx <= endIdx) {
      let childTwoIdx = 2 * idx + 2 <= endIdx ? 2 * idx + 2 : -1
      let swapIdx
      if (childTwoIdx !== -1 && heap[childOneIdx] < heap[childTwoIdx]) {
        swapIdx = childTwoIdx
      } else swapIdx = childOneIdx
      if (heap[swapIdx] > heap[idx]) {
        this.swap(swapIdx, idx, heap)
        idx = swapIdx
        childOneIdx = 2 * idx + 1
      } else return
    }
  }

  siftUp(idx: number, heap: number[]) {
    let parentIdx = Math.floor((idx - 1) / 2)
    while (heap[parentIdx] < heap[idx] && idx > 0) {
      this.swap(parentIdx, idx, heap)
      idx = parentIdx
      parentIdx = Math.floor((idx - 1) / 2)
    }
  }

  peek() {
    return this.heap[0]
  }

  remove() {
    this.swap(this.heap.length - 1, 0, this.heap)
    const removeValue = this.heap.pop()
    this.siftDown(0, this.heap.length - 1, this.heap)
    return removeValue
  }

  size() {
    return this.heap.length
  }

  insert(value: number) {
    this.heap.push(value)
    this.siftUp(this.heap.length - 1, this.heap)
  }
  swap(i: number, j: number, arr: number[]) {
    let ele = arr[i]
    arr[i] = arr[j]
    arr[j] = ele
  }
}

function lastStoneWeight(stones: number[]): number {
  const heap = new MaxHeap(stones)

  while (heap.size() > 1) {
    const stone1 = heap.remove()
    const stone2 = heap.remove()

    heap.insert(stone1 - stone2)
  }

  return heap.peek()
}
