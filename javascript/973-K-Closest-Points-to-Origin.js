//////////////////////////////////////////////////////////////////////////////
// Sort with Custom Comparator
// Time: O(nlogn)
// Space: O(n)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    // Sort the array with a custom lambda comparator function
    points.sort((a, b) => squaredDistance(a) - squaredDistance(b));
    
    // Return the first k elements of the sorted array
    return points.slice(0, k);
};

// Calculate and return the squared Euclidean distance
const squaredDistance = ([x, y]) => x ** 2 + y ** 2;

//////////////////////////////////////////////////////////////////////////////
// Max Heap or Max Priority Queue
// Time: O(nlogk)
// Space: O(k)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    let maxPQ = new MaxPriorityQueue();
    for (let point of points) {
        let dist = squaredDistance(point);
        if (maxPQ.size() < k) {
            // Fill the max PQ up to k points
            maxPQ.enqueue(point, dist);
        } else if (dist < maxPQ.front().priority) {
            // If the max PQ is full and a closer point is found,
            // discard the farthest point and add this one
            maxPQ.dequeue();
            maxPQ.enqueue(point, dist);
        }
    }
    
    // Return all points stored in the max PQ
    return maxPQ.toArray().map(el => el.element);
};

// Calculate and return the squared Euclidean distance
const squaredDistance = ([x,y]) => x ** 2 + y ** 2;

//////////////////////////////////////////////////////////////////////////////
// Binary Search
// Time: O(n)
// Space: O(n)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    // Precompute the Euclidean distance for each point
    let distances = points.map(euclideanDistance);
    // Create a reference array of point indices
    let remaining = points.map((_, i) => i);
    // Define the initial binary search range
    let low = 0, high = Math.max(...distances);
    
    // Perform a binary search of the distances
    // to find the k closest points
    let closest = []
    while (k) {
        let mid = low + (high - low) / 2;
        let [closer, farther] = splitDistances(remaining, distances, mid);
        if (closer.length > k) {
            // If more than k points are in the closer distances
            // then discard the farther points and continue
            remaining = closer;
            high = mid;
        } else {
            // Add the closer points to the answer array and keep
            // searching the farther distances for the remaining points
            k -= closer.length;
            closest.push(...closer);
            remaining = farther;
            low = mid;
        }
    }
    
    // Return the k closest points using the reference indices
    return closest.map(i => points[i]);
};

var splitDistances = function(remaining, distances, mid) {
    // Split the distances around the midpoint
    // and return them in separate arrays
    let closer = [], farther = [];
    for (let index of remaining) {
        if (distances[index] <= mid) {
            closer.push(index);
        } else {
            farther.push(index);
        }
    }
    return [closer, farther];
};

// Calculate and return the squared Euclidean distance
const euclideanDistance = ([x,y]) => x ** 2 + y ** 2;

//////////////////////////////////////////////////////////////////////////////
// QuickSelect
// Time: O(n)
// Space: O(1)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    return quickSelect(points, k)
};

var quickSelect = function(points, k) {
    let left = 0, right = points.length - 1;
    let pivotIndex = points.length;
    while (pivotIndex !== k) {
        // Repeatedly partition the array
        // while narrowing in on the kth element
        pivotIndex = partition(points, left, right);
        if (pivotIndex < k) {
            left = pivotIndex;
        } else {
            right = pivotIndex - 1;
        }
    }
    
    // Return the first k elements of the partially sorted array
    return points.slice(0, k);
};

var partition = function(points, left, right) {
    let pivot = choosePivot(points, left, right);
    let pivotDist = squaredDistance(pivot);
    while (left < right) {
        // Iterate through the range and swap elements to make sure
        // that all points closer than the pivot are to the left
        if (squaredDistance(points[left]) >= pivotDist) {
            [points[left], points[right]] = [points[right], points[left]];
            right--;
        } else {
            left++;
        }
    }
    
    // Ensure the left pointer is just past the end of
    // the left range then return it as the new pivotIndex
    if (squaredDistance(points[left]) < pivotDist) {
        left++;
    }
    
    return left;
};

// Choose a pivot element of the array
const choosePivot = (points, left, right) => points[left + ((right - left) >> 1)];

// Calculate and return the squared Euclidean distance
const squaredDistance = ([x,y]) => x ** 2 + y ** 2;
