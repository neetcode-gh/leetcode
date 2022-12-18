/**
 * https://leetcode.com/problems/largest-rectangle-in-histogram/solution/
 * Time O(N^3) | Space O(1)
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights, maxArea = 0) {
    for (let i = 0; i < heights.length; i++) {/* Time O(N) */
        for (let j = i; j < heights.length; j++) {/* Time O(N) */
            let min = Infinity;

            for (let k = i; k <= j; k++) {            /* Time O(N) */
                min = Math.min(min, heights[k]);
            }

            const area = min * ((j - i) + 1);

            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
}

/**
 * https://leetcode.com/problems/largest-rectangle-in-histogram/solution/
 * Time O(N^2) | Space O(1)
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights, maxArea = 0) {
    for (let i = 0; i < heights.length; i++) {/* Time O(N) */
        let min = Infinity;

        for (let j = i; j < heights.length; j++) {/* Time O(N) */
            min = Math.min(min, heights[j]);

            const area = min * ((j - i) + 1);

            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
}

/**
 * https://leetcode.com/problems/largest-rectangle-in-histogram/solution/
 * Time O(N^2) | Space O(N)
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights, left = 0, right = (heights.length - 1)) {
    const isBaseCase = right < left;
    if (isBaseCase) return 0;

    return divideAndConquer(heights, left, right);                  /* Time O(N^2) | Space O(N) */
}

const divideAndConquer = (heights, left, right, min = left) => {
    for (let i = left; i <= right; i++) {                           /* Time O(N) */
        const isMinGreater = heights[i] < heights[min];
        if (!isMinGreater) continue;

        min = i;
    }

    const window = (right - left) + 1;
    const area = heights[min] * window;

    const leftArea = largestRectangleArea(heights, (min + 1), right)/* Time O(N^2) | Space O(N) */
    const rightArea = largestRectangleArea(heights, left, (min - 1))/* Time O(N^2) | Space O(N) */

    return Math.max(area, leftArea, rightArea);
}

/**
 * https://leetcode.com/problems/largest-rectangle-in-histogram/solution/
 * Time O(N) | Space O(N)
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    const { stack, maxArea } = fillStack(heights);        /* Time O(N) | Space O(N) */

    return getMaxArea(heights, stack, maxArea);           /* Time O(N) */
};

const fillStack = (heights, stack = [], maxArea = 0) => {
    for (let index = 0; index < heights.length; index++) {/* Time O(N + N) */
        let start = index;

        const isCurrHeightLess = ([ prevIndex, prevHeight ], currHeight) =>  currHeight < prevHeight;
        const canShrink = () => isCurrHeightLess(stack[stack.length - 1], heights[index]);
        while (stack.length && canShrink()) {             /* Time O(N + N) */
            const [ _index, _height ] = stack.pop();
            const width = index - _index;
            const area = _height * width;

            maxArea = Math.max(maxArea, area);
            start = _index;
        }

        stack.push([ start, heights[index] ]);            /* Space O(N) */
    }

    return { stack, maxArea }
}

const getMaxArea = (heights, stack, maxArea) => {
    for (const [ index, height ] of stack) {              /* Time O(N) */
        const width = heights.length - index;
        const area = height * width;

        maxArea = Math.max(maxArea, area);
    }

    return maxArea;
}



