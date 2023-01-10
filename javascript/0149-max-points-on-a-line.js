/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
    let res = 1;

    for (let i = 0; i < points.length; i++) {
        const count = new Map();
        const point1 = points[i];
        for (let j = i + 1; j < points.length; j++) {
            const point2 = points[j];
            let slope;
            if (point2[0] === point1[0]) {
                slope = Number.MAX_SAFE_INTEGER;
            } else {
                slope = (point2[1] - point1[1]) / (point2[0] - point1[0]);
            }
            !count.has(slope)
                ? count.set(slope, 2)
                : count.set(slope, count.get(slope) + 1);

            res = Math.max(res, count.get(slope));
        }
    }
    return res;
};
