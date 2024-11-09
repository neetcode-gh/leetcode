/**
 * MaxPriorityQueue 
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/furthest-building-you-can-reach/
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
var furthestBuilding = function(heights, bricks, ladders) {

    const maxPriorityQueue = new MaxPriorityQueue({
        compare: (a, b) => {
            return b - a;
        }
    });

    let i = 0;

    while (i < heights.length - 1) {
        const diff = heights[i + 1] - heights[i];

        if (diff <= 0) {
            i++;
            continue;
        }

        bricks -= diff;
        maxPriorityQueue.enqueue(diff);

        if (bricks < 0) {
            if (!ladders) return i;
            ladders -= 1;
            bricks += maxPriorityQueue.dequeue();
        }
        i++;
    }

    return heights.length - 1;
};
