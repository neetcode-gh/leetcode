/*

https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/

80. Remove Duplicates from Sorted Array II

Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.

 

Example 1:

Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
Example 2:

Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
 

Constraints:

1 <= nums.length <= 3 * 104
-104 <= nums[i] <= 104
nums is sorted in non-decreasing order.

*/

// Let's start with the pseudo code:

// # Pseudo Code

// 1. Initialize a variable `currentIdx` to 0.
// 2. Iterate through each element `ele` in the `nums` array.
// 3. If `currentIdx` is less than 2 or the element at `currentIdx - 2` is not equal to the current element `ele`:
//     a. Update the value at index `currentIdx` in the `nums` array with `ele`.
//     b. Increment `currentIdx`.
// 4. Return `currentIdx`.

// Now, let's add debug print statements and explanations before each step:

// Now, let's analyze the complexity:

// # Complexity

// - Time complexity: $$O(n)$$, where $$n$$ is the number of elements in the `nums` array. We iterate through the array once.
// - Space complexity: $$O(1)$$, as we are modifying the array in-place and only using a constant amount of extra space for variables `currentIdx` and `ele`.

//  test cases

function removeDuplicates(nums: number[]): number {
    // Initialize a variable to track the current index in the modified array.
    let currentIdx = 0;

    // Iterate through each element in the array.
    for (const ele of nums) {
        // Print the current index and the element for debugging.
        console.log('Current Index:', currentIdx, 'Element:', ele);

        // Check if either we haven't reached 2 elements yet or if the previous two elements are not equal to the current element.
        if (currentIdx < 2 || nums[currentIdx - 2] != ele) {
            // Print a message indicating that the condition is met.
            console.log('Condition Met: Inserting Element');

            // Modify the value at the current index with the current element.
            nums[currentIdx] = ele;

            // Increment the current index.
            currentIdx++;

            // Print the updated current index for debugging.
            console.log('Updated Current Index:', currentIdx);
        }
    }
    // Return the final count of unique elements.
    return currentIdx;
}

console.log(removeDuplicates([1, 1, 1, 2, 2, 3])); // Expected output: 5
// Explanation: The modified array after removing duplicates is [1, 1, 2, 2, 3, _].

console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3])); // Expected output: 7
// Explanation: The modified array after removing duplicates is [0, 0, 1, 1, 2, 3, 3, _, _].
