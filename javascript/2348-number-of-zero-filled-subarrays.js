/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function (nums) {
    // Initialize the result with the count of zeros in the array
    let res = nums.filter((num) => num === 0).length;

    // If there are no zeros, return 0
    if (res === 0) {
        return 0;
    }

    // Initialize the right pointer and get the length of the array
    let r = 0;
    let l = nums.length;

    // Loop through the array
    while (r < l) {
        // Temporary array to hold consecutive zeros
        let tempSubarray = [];

        // While loop to collect all consecutive zeros starting from index 'r'
        while (r < l && nums[r] === 0) {
            tempSubarray.push(nums[r]);
            r++;
        }

        // If the temporary subarray has more than one zero, calculate the number of subarrays
        if (tempSubarray.length > 1) {
            let tempCount =
                (tempSubarray.length * (tempSubarray.length - 1)) / 2;
            res += Math.floor(tempCount); // Add the calculated subarrays to the result
        }

        // Move the right pointer to the next element
        r++;
    }

    // Return the total count of zero-filled subarrays
    return res;
};
