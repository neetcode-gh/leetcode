/**
 * https://leetcode.com/problems/meeting-rooms-ii/
 * Time O((N * logN) + (M * logM)) | Space O(1)
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
    const { start, end } = splitIntervals(intervals);
    let [minRooms, startIndex, endIndex] = [0, 0, 0];

    while (startIndex < intervals.length) {
        const [currStart, prevEnd] = [start[startIndex], end[endIndex]];

        const hasGap = prevEnd <= currStart;
        if (hasGap) {
            minRooms--;
            endIndex++;
        }

        minRooms++;
        startIndex++;
    }

    return minRooms;
};

const splitIntervals = (intervals, start = [], end = []) => {
    for (const [startTime, endTime] of intervals) {
        start.push(startTime);
        end.push(endTime);
    }

    const comparator = (a, b) => a - b;

    start.sort(comparator);
    end.sort(comparator);

    return { start, end };
};
