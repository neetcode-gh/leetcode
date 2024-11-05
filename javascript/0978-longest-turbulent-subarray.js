/**
 * Two Pointers | Greedy
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/longest-turbulent-subarray/
 * @param {number[]} arr
 * @return {number}
 */
var maxTurbulenceSize = function(arr) {
    
    const higherAndLower = (start) => {

        let i = start;
        let shouldBeLow = true;

        while (i + 1 < arr.length) {
            if (shouldBeLow && arr[i + 1] > arr[i]) break;
            if (!shouldBeLow && arr[i + 1] < arr[i]) break;
            if (arr[i + 1] === arr[i]) break;
            shouldBeLow = !shouldBeLow;
            i++;
        }

        return i;

    }

    const lowerAndHigher = (start) => {


        let i = start;
        let shouldBeHigh = true;

        while (i + 1 < arr.length) {
            if (shouldBeHigh && arr[i + 1] < arr[i]) break;
            if (!shouldBeHigh && arr[i + 1] > arr[i]) break;
            if (arr[i + 1] === arr[i]) break;
            shouldBeHigh = !shouldBeHigh;
            i++;
        }

        return i;
    }


    let left = 0;
    let right = 1;
    let max = 1;

    while (right < arr.length) {

        if (arr[left] > arr[right]) {
            right = higherAndLower(left);
            max = Math.max(right - left + 1, max);
            left = right;
            right = right + 1;
            continue;
        }

        if (arr[left] < arr[right]) {
            right = lowerAndHigher(left);
            max = Math.max(right - left + 1, max);
            left = right;
            right = right + 1;
            continue;
        }

        if (arr[left] === arr[right]) {
            left++;
            right++;
        }

    }

    return max;
};
