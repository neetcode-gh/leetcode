/**
 * https://leetcode.com/problems/grid-game/
 * Linear
 * Time O(n) | Space O(n)
 * @param {number[][]} grid
 * @return {number}
 */

// Calculate the prefix sums for a given row in the grid
function calculatePrefixSums(row) {
    const prefixSums = [0];
    for (let i = 1; i <= row.length; i++) {
        prefixSums.push(prefixSums[i - 1] + row[i - 1]);
    }
    return prefixSums;
}

// Find the minimum value between two arrays
function findMinimumValue(arr1, arr2) {
    let min = Infinity;
    for (let i = 1; i < arr1.length; i++) {
        const top = arr1[arr1.length - 1] - arr1[i];
        const bottom = arr2[i - 1];
        let secondRobot = Math.max(top, bottom);
        min = Math.min(min, secondRobot);
    }
    return min;
}

// Main function to calculate the minimum result
function gridGame(grid) {
    const preSum1 = calculatePrefixSums(grid[0]);
    const preSum2 = calculatePrefixSums(grid[1]);

    return findMinimumValue(preSum1, preSum2);
}
