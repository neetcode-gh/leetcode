/**
 * https://leetcode.com/problems/k-closest-points-to-origin/
 * Time O(N * log(N)) | Space O(K)
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
 var kClosest = function(points, K) {
    const distance = ([x, y]) => (x * x) + (y * y); 

    points.sort((a, b) => distance(a) - distance(b));

    return points.slice(0, K);
};

/**
 * https://leetcode.com/problems/k-closest-points-to-origin/
 * Time O(log(K)) | Space O(K)
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, K) {
    const [ left, right ] = [ 0, (points.length - 1) ];

    quickSelect(points, K, left, right);

    return points.slice(0, K)
};

const quickSelect = (points, target, left, right) => {
    const mid = getMid(points, left, right);

    const isTarget = mid === (target - 1);
    if (isTarget) return;
    
    const isTargetGreater =  mid < (target - 1);
    if (isTargetGreater) quickSelect(points, target, (mid + 1), right);
    
    const isTargetLess = (target - 1) < mid;
    if (isTargetLess) quickSelect(points, target, left, (mid - 1));
}

const swap = (points, left, right) => [ points[left], points[right] ] = [ points[right], points[left] ];

const squareRoot = ([ x, y ]) => ((x * x) + (y * y));

const getMid = (points, left, right) => {
    let mid = left;

    while (left < right) {
        const [ leftDistance, rightDistance ] = [ squareRoot(points[left]), squareRoot(points[right]) ];

        const canSwapMid = leftDistance <= rightDistance
        if (canSwapMid) {
            swap(points, left, mid);
            mid++;
        }

        left++;
    }

    swap(points, mid, right);

    return mid;
}

/**
 * https://leetcode.com/problems/k-closest-points-to-origin/
 * Time O(N * log(K)) | Space O(K)
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    const maxHeap = new MaxPriorityQueue({ priority: (point) => distance(point) })

    for (const point of points) {
        const isUnderCapacity = maxHeap.size() < k;
        if (isUnderCapacity) {
            maxHeap.enqueue(point);
            continue;
        }

        const isCloser = distance(point) < distance(maxHeap.front().element);
        if (isCloser) {
            maxHeap.dequeue();
            maxHeap.enqueue(point);
        }
    }

    return maxHeap
        .toArray()
        .map(({ element }) => element);
}

const distance = ([ x, y ]) => (x * x) + (y * y);