/**
 * Sorting | Intervals
 * Time O(n*log(n)) | Space O(n) (because js sort method takes n space)
 * https://leetcode.com/problems/remove-covered-intervals/
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function(intervals) {
    
    intervals = intervals.sort((a, b) => {

        if (a[0] === b[0]) return b[1] - a[1];
        return a[0] - b[0];
    });

    let remaining = 0;
    let i = 0;

    while (i < intervals.length) {
        
        const [left, right] = intervals[i];
        while (i < intervals.length && isCovered(left, right, intervals[i])) i++;
        remaining++;
    }

    return remaining;
};

const isCovered = (left, right, interval) => {

    if (interval[0] >= left && interval[0] <= right &&
        interval[1] >= left && interval[1] <= right) return true;

    return false;
}
