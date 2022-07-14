/**
 * https://leetcode.com/problems/k-closest-points-to-origin/
 * https://www.youtube.com/watch?v=rI2EBUEMfTk
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
const kClosest = (points, k) => {
  // create a maxHeap
  const distHeap = new Heap(
    (a, b) => b[0] * b[0] + b[1] * b[1] - (a[0] * a[0] + a[1] * a[1])
  );
  // Add first k points to heap
  // // O (k * logK) time
  for (let i = 0; i < k; i += 1) {
    distHeap.add(points[i]);
  }

  // compare remaining elements
  // O(n-k) * logK) time
  for (let i = k; i < points.length; i += 1) {
    const currentPoint = points[i];
    const currentDist =
      currentPoint[0] * currentPoint[0] + currentPoint[1] * currentPoint[1];
    const peekElement = distHeap.peek();
    const heapPointDist =
      peekElement[0] * peekElement[0] + peekElement[1] * peekElement[1];
    if (currentDist < heapPointDist) {
      distHeap.remove();
      distHeap.add(currentPoint);
    }
  }

  // next we create an array to contain points up to K
  const results = [];
  for (let i = 0; i < k; i += 1) {
    results[i] = distHeap.remove();
  }
  return results;
};

/**
 * egghead.io - Heap
 * https://github.com/basarat/algorithms/blob/master/src/heap/heap.ts
 */

/**
 * Implements the heap data structure
 * A heap is used as a priority queue
 * Note: The default compare behavior gives you a min heap
 * @constructor ((a,b) => void) comparator, by default - ascending (a-b)
 */
class Heap {


  constructor(compareFn = undefined) {
    this.data = [];
    this.compareFn = compareFn && typeof compareFn === 'function' ? compareFn : (a, b) => (a - b);
  }

  left(nodeIndex) {
    return (2 * nodeIndex) + 1;
  }

  right(nodeIndex) {
    return (2 * nodeIndex) + 2;
  }

  parent(nodeIndex) {
    return nodeIndex % 2 == 0
      ? (nodeIndex - 2) / 2
      : (nodeIndex - 1) / 2;
  }

  /**
   * Adds the given element into the heap in O(logn)
   */
  add(element) {
    this.data.push(element);
    this.siftUp(this.data.length - 1);
  }

  /**
   * Moves the nod at the given index up to its proper place in the heap.
   * @param index The index of the node to move up.
   */
  siftUp(index) {
    let parent = this.parent(index);
    while (index > 0 && this.compareFn(this.data[parent], this.data[index]) > 0) {
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
      parent = this.parent(index);
    }
  }

  /**
   * Retrieves and removes the root element of this heap in O(logn)
   * - Returns undefined if the heap is empty.
   */
  remove() {
    if (this.data.length > 0) {
      const root = this.data[0];
      const last = this.data.pop();
      if (this.data.length > 0) {
        this.data[0] = last;
        this.siftDown(0);
      }
      return root;
    } else {
      return undefined;
    }
  }

  /**
   * Moves the node at the given index down to its proper place in the heap.
   * @param index The index of the node to move down.
   */
  siftDown(index) {
    /** @returns the index containing the smaller value */
    const minIndex = (left, right) => {
      if (right >= this.data.length) {
        if (left >= this.data.length) {
          return -1;
        } else {
          return left;
        }
      } else {
        if (this.compareFn(this.data[left], this.data[right]) <= 0) {
          return left;
        } else {
          return right;
        }
      }
    }

    let min = minIndex(this.left(index), this.right(index));

    while (
      min >= 0
      && this.compareFn(this.data[index], this.data[min]) > 0
    ) {
      [this.data[min], this.data[index]] = [this.data[index], this.data[min]];
      index = min;
      min = minIndex(this.left(index),
        this.right(index));
    }
  }

  /**
   * Returns the number of elements in the heap in O(1)
   */
  size() {
    return this.data.length;
  }

  /**
   * Retrieves but does not remove the root element of this heap in O(1)
   * - Returns undefined if the heap is empty.
   */
  peek() {
    if (this.data.length > 0) {
      return this.data[0];
    } else {
      return undefined;
    }
  }
}



// TESTING
const origins01 = [
  [1, 3],
  [-2, 2],
];
const k01 = 1;
const origins02 = [
  [3, 3],
  [5, -1],
  [-2, 4],
];
const k02 = 2;

console.log("K closest points to origin: ", kClosest(origins01, k01)); // [[-2,2]]
console.log("K closest points to origin: ", kClosest(origins02, k02)); // [[-2,4],[3,3]]

/*
 * NOTES
 * Time complexity - O(nlogk).
 * Make a MAX HEAP of size k rather than a min-heap.
 * Then, when an element 'x' comes in, just compare
 * if 'x' is smaller than the largest element in the max heap( the top one.) or not.
 * If x is smaller, We can drop the previous top element away and add 'x' to our max heap.
 */
