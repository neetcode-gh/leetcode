/*
 * https://leetcode.com/problems/design-twitter/
 * https://www.youtube.com/watch?v=pNichitDD2E&t=779
 * Using Heap Datastructure (MaxHeap) 
*/

/**
 * type IUserTweetTimeStamp = {
 *	time: number,
 *	tweetId: number
 * };
 *
 * type IUserTweetTracker = {
 *	user: IUserTweetTimeStamp,
 *	followeeId: number,
 *	index: number
 * };
 */

 class Twitter {
  constructor() {
    this.followMap = new Map();
    this.tweetMap = new Map();
    this.time = 0;
  }

  postTweet (userId, tweetId) {
    if (!this.tweetMap.has(userId)) {
      this.tweetMap.set(userId, []);
    }
    this.tweetMap.get(userId).push({ time: this.time, tweetId });
    this.time += 1;
  }

  getNewsFeed (userId) {
    const result = [];
    // a,b: IUserTweetTracker
    const maxHeap = new Heap((a, b) => b.user.time - a.user.time);
    // getordefault
    if (!this.followMap.has(userId)) {
      this.followMap.set(userId, new Set());
    } 
    const list = this.followMap.get(userId);
    list.add(userId);

    // iterate through the set
    for (let id of Array.from(this.followMap.get(userId))) {
      if (this.tweetMap.has(id)) {
        const index = this.tweetMap.get(id).length - 1;
        if (index >= 0) {
          const current = this.tweetMap.get(id)[index];
          maxHeap.add({ user: current, followeeId: userId, index: index - 1 });
        }
      }
    }

    // check heap
    while (maxHeap.size() > 0 && result.length < 10) {
      const ustt = maxHeap.remove();
      result.push(ustt.user.tweetId);
      if (ustt.index >= 0) {
        const temp = this.tweetMap.get(ustt.followeeId)[ustt.index];
        maxHeap.add({
          user: temp,
          followeeId: ustt.followeeId,
          index: ustt.index - 1,
        });
      }
    }
    // return list
    return result;
  }

  follow (followerId, followeeId) {
    // getOrDefault
    if (!this.followMap.has(followerId)) {
      this.followMap.set(followerId, new Set());
    }
    const list = this.followMap.get(followerId);
    list.add(followeeId);
  }

  unfollow (followerId, followeeId) {
    // remove if present
    if (
      this.followMap.has(followerId) &&
      this.followMap.get(followerId).has(followeeId)
    ) {
      const list = this.followMap.get(followerId);
      list.delete(followeeId);
    }
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

// TESTING
const twitterMy = new Twitter();
twitterMy.postTweet(1, 5);
console.log("News feed: ", twitterMy.getNewsFeed(1));
twitterMy.follow(1, 2);
twitterMy.postTweet(2, 6);
console.log("News feed: ", twitterMy.getNewsFeed(1));
