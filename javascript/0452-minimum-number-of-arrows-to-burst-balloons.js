/**
 * Sorting | Array | Interval
 * Time O(n*log(n)) | Space O(1)
 * https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    
    points = points.sort((pointA, pointB) => {
        if (pointA[0] === pointB[0]) return pointA[1] - pointB[1];
        return pointA[0] - pointB[0];
    });

    let count = 0;
    let i = 0;
    
    while (i < points.length) {
        let currRange = [points[i][0], points[i][1]]; 

        // keep bursting balloons until you can't
        while (i + 1 < points.length && isInRange(currRange, points[i+1][0])) {
            currRange = [
                points[i+1][0],
                Math.min(points[i+1][1], currRange[1])
            ];
            i++;
        }

        i++;
        count++;
    }

    return count;
};

const isInRange = (range, point) => {
    if (point >= range[0] && point <= range[1]) return true;
    return false;
}
