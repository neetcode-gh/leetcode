/**
 * Task Scheduler
 * https://www.youtube.com/watch?v=s8p8ukTyA2I
 * Leetcode #621 - https://leetcode.com/problems/task-scheduler/
 * Space time complexity
 * Time: O(n*logk)
 * Space: O(n)
 * @param {string []} tasks
 * @param {number} k
 * @returns {number} interval
*/
const leastInterval = (tasks, k) => {
  // edge case
  if (k < 1) return tasks.length;
  // set interval count
  let interval = 0;

  // add frequency map - O(n)
  const map = new Map();
  for (let t of tasks) {
    if (!map.has(t)) map.set(t, 0);
    const count = map.get(t);
    map.set(t, count + 1);
  }

  // create a maxHeap
  const maxHeap = new Heap((a, b) => b - a);
  // prefill heap - O(n)
  Array.from(map.values()).map((item) => maxHeap.add(item));
  
  // time complexity - O(n*logn)
  while (maxHeap.size() > 0) {
    const waitList = [];
    let n = k + 1;
    while (n > 0 && maxHeap.size() > 0) {
      interval += 1;
      let entry = maxHeap.remove();
      if (entry > 1) {
        entry = entry - 1;
        waitList.push(entry);
      }
      n -= 1;
    }
    waitList.map((item) => maxHeap.add(item));
    if (maxHeap.size() > 0) {
      interval += n;
    }
  }
  return interval;
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
const task01 = ["A", "A", "A", "B", "B", "B"];
const n = 2;
console.log("Least idle interval is: ", leastInterval(task01, n)); // 8
