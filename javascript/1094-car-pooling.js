/**
 * MinHeap
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/car-pooling/
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function(trips, capacity) {
    
    const minQ = new MinPriorityQueue({
        compare: (e1, e2) => {
            return e1[0] - e2[0];
        }
    });

    trips.sort((a, b) => a[1] - b[1]);

    for (let i = 0; i < trips.length; i++) {
        while (!minQ.isEmpty() && minQ.front()[0] <= trips[i][1]) {
            capacity += minQ.dequeue()[1];
        };

        capacity -= trips[i][0];
        if (capacity < 0) return false;
        minQ.enqueue([trips[i][2], trips[i][0]]);
    }

    return true;
};
