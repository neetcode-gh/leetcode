/**
 * https://leetcode.com/problems/meeting-rooms/
 * Time O(N * logN) | Space O(1)
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
    intervals.sort(([aStart, aEnd], [bStart, bEnd]) =>
        aStart !== bStart ? aStart - bStart : aEnd - bEnd
    );

    return canAttend(intervals);
};

const canAttend = (intervals) => {
    let prev = intervals.shift();

    for (const curr of intervals) {
        const [prevStart, prevEnd] = prev;
        const [currStart, currEnd] = curr;

        const hasOverlap = currStart < prevEnd;
        if (hasOverlap) return false;

        prev = curr;
    }

    return true;
};
