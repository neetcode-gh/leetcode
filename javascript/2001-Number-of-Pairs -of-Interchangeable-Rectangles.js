/**
 * Brute Force
 * Time O(N^2) | Space O(1)
 * https://leetcode.com/problems/number-of-pairs-of-interchangeable-rectangles
 * @param {number[][]} rectangles
 * @return {number}
 */
var interchangeableRectangles = (rectangles) => {

    let totalPair = 0;
    for (let i = 0; i < rectangles.length; i++) {
        for (let j = i + 1; j < rectangles.length; j++) {
            if (rectangles[i][1] / rectangles[i][0] === rectangles[j][1] / rectangles[j][0]) {
                totalPair++;
            }
        }
    }
    return totalPair;
};
/**
 * Linear 
 * Time O(N) | Space O(n)
 * @param {number[][]} rectangles
 * @return {number}
 */
var interchangeableRectangles = (rectangles) => {

    const ratioFrequency = {};

    for (let i = 0; i < rectangles.length; i++) {
        const ratio = rectangles[i][1] / rectangles[i][0];
        if (ratioFrequency[ratio.toString()]) {
            ratioFrequency[ratio.toString()] += 1;
        } else {
            ratioFrequency[ratio.toString()] = 1;
        }
    }

    let totalPair = 0;
    for (const key in ratioFrequency) {
        if (ratioFrequency[key] !== 1) {
            totalPair += (ratioFrequency[key] * (ratioFrequency[key] - 1)) / 2;
        }
    }

    return totalPair;
};
