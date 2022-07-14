/**
 * Find Median in a Datastream
 * https://www.youtube.com/watch?v=itmhHWaHupI
 * https://leetcode.com/problems/find-median-from-data-stream/
 * Using Heap Datastructure (Maxheap and Minheap)
 */
class MedianFinder {
	constructor () {
		// create 2 heaps
		this.smallHeap = new Heap((a,b)=>(b-a)); //maxHeap
		this.largeHeap = new Heap((a,b)=>(a-b)); //minHeap
	}

	addNum (num) {
		this.smallHeap.add(num);
		
		// make sure every num small is <= every num in large
		if (this.smallHeap.size() > 0 &&
			this.largeHeap.size() > 0 &&
			this.smallHeap.peek() > 
			this.largeHeap.peek()) {
			const el = this.smallHeap.remove();
			this.largeHeap.add(el);
		}

		// check uneven size
		if (this.smallHeap.size() > this.largeHeap.size()+1) {
			const el = this.smallHeap.remove();
			this.largeHeap.add(el);
		}
		if (this.largeHeap.size() > this.smallHeap.size()+1) {
			const el = this.largeHeap.remove();
			this.smallHeap.add(el);
		}
	}

	findMedian () {	
		// check if we have odd number of elements
		if (this.smallHeap.size() > this.largeHeap.size()) {
			return this.smallHeap.peek();
		} else if (this.largeHeap.size() > this.smallHeap.size()) {
			return this.largeHeap.peek();
		}
		return ((this.smallHeap.peek() + this.largeHeap.peek())/2);
	}
}

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
