/**
 * https://leetcode.com/problems/container-with-most-water/
 * Two pointers, Time O(N) | Space(1)
 * @param {number[]} height
 * @return {number}
 */

var maxArea = function (height) {
    let [left, right, max] = [0, height.length - 1, 0];

    while (left < right) {
        let containerHeight, area;
        let containerWidth = right - left;

        if (height[left] < height[right]) {
            containerHeight = height[left];
            left++;
        } else {
            containerHeight = height[right];
            right--;
        }

        area = containerWidth * containerHeight;

        if (area > max) {
            max = area;
        }
    }

    return max;
};
