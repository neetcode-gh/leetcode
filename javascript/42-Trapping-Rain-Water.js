//////////////////////////////////////////////////////////////////////////////
// Time: O(n)  Space: O(1)  One iteration.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Array<number>} heights
 * @return {number}
 */
function trap(heights) {
    let l = 0;
    let r = heights.length - 1;
    let lMax = 0;
    let rMax = 0;
    let total = 0;

    while (l < r) {
        if (heights[l] < heights[r]) {
            if (heights[l] >= lMax) {
                lMax = heights[l];
            } else {
                total += lMax - heights[l];
            }
            ++l;
        } else {
            if (heights[r] >= rMax) {
                rMax = heights[r];
            } else {
                total += rMax - heights[r];
            }
            --r;
        }
    }

    return total;
}

//////////////////////////////////////////////////////////////////////////////
// Time: O(n)  Space: O(n)  Two iterations (one main loop and one stack).
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Array<number>} heights
 * @return {number}
 */
function trap(heights) {
    const stack = [];
    let total = 0;

    for (let i = 0; i < heights.length; ++i) {
        while (stack.length && heights[i] > heights[top(stack)]) {
            const j = stack.pop();

            if (!stack.length) {
                break;
            }

            const k = top(stack);
            const spread = i - k - 1;
            const height = Math.min(heights[i], heights[k]) - heights[j];
            total += spread * height;
        }

        stack.push(i);
    }

    return total;
}

/**
 * @param {!Array<*>} stack
 * @return {*}
 */
function top(stack) {
    return stack[stack.length - 1];
}

//////////////////////////////////////////////////////////////////////////////
// Time: O(n)  Space: O(n)  Three iterations (two main loop and one stack).
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Array<number>} heights
 * @return {number}
 */
function trap(heights) {
    let valley = [];
    let barrier = 0;
    let trapped = 0;

    for (const height of heights) {
        if (height >= barrier) {
            while (valley.length) {
                trapped += barrier - valley.pop();
            }
            barrier = height;
        } else {
            valley.push(height);
        }
    }

    valley.reverse();
    valley.push(barrier);
    heights = valley;
    valley = [];
    barrier = 0;

    for (const height of heights) {
        if (height >= barrier) {
            while (valley.length) {
                trapped += barrier - valley.pop();
            }
            barrier = height;
        } else {
            valley.push(height);
        }
    }

    return trapped;
}
