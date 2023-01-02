/**
 * Linear
 * Time O(n) | Space O(n) 
 * https://leetcode.com/problems/trapping-rain-water
 * @param {number[]} height
 * @return {number}
 * 
 */
var trap = function(height) {
    
    const maxLeft = [];
    const maxRight = [];
    const minLeftRight = [];

    let current = 0;
    for(let i = 0; i < height.length; i++) {
     maxLeft.push(current);
     current  = Math.max(current, height[i]);
    }
    current = 0;
    for(let i = height.length - 1; i > -1; i--) {
        maxRight.push(current);
        current = Math.max(current, height[i]);
    }
    // because the elements were added reverse. 
    maxRight.reverse();

    for(let i = 0; i < height.length; i++) {
        const minofLeftRight = Math.min(maxLeft[i],maxRight[i]);
        minLeftRight.push(minofLeftRight);
    }

    let water = 0;
    for(let i = 0; i < height.length; i++) {
        if(minLeftRight[i] - height[i] > 0) {
            water += minLeftRight[i] - height[i];
        }
    }

    return water;
};


/**
 * https://leetcode.com/problems/trapping-rain-water/
 * Time O(N) | Space O(1)
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let [left, right] = [0, height.length - 1];
    let [maxLeft, maxRight, area] = [0, 0, 0];

    while (left < right) {
        const [leftHeight, rightHeight] = getHeights(height, left, right);
        const [leftWindow, rightWindow] = getWindows(
            height,
            left,
            maxLeft,
            right,
            maxRight
        );

        const isRightGreater = leftHeight <= rightHeight;
        if (isRightGreater) {
            if (hasNewMax(maxLeft, leftHeight)) maxLeft = leftHeight;
            else area += leftWindow;

            left++;
        }

        const isRightLess = rightHeight < leftHeight;
        if (isRightLess) {
            if (hasNewMax(maxRight, rightHeight)) maxRight = rightHeight;
            else area += rightWindow;

            right--;
        }
    }

    return area;
};

const hasNewMax = (max, height) => max < height;

const getHeights = (height, left, right) => [height[left], height[right]];

const getWindows = (height, left, maxLeft, right, maxRight) => {
    const [leftHeight, rightHeight] = getHeights(height, left, right);
    const [leftWindow, rightWindow] = [
        maxLeft - leftHeight,
        maxRight - rightHeight,
    ];

    return [leftWindow, rightWindow];
};
