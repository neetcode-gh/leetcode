function removeDuplicates(nums: number[]): number {
    // Initialize a variable to track the current index in the modified array.
    let currentIdx = 0;

    // Iterate through each element in the array.
    for (const ele of nums) {
        // Check if either we haven't reached 2 elements yet or if the previous two elements are not equal to the current element.
        if (currentIdx < 2 || nums[currentIdx - 2] != ele) {
            // Modify the value at the current index with the current element.
            nums[currentIdx] = ele;

            // Increment the current index.
            currentIdx++;
        }
    }
    // Return the final count of unique elements.
    return currentIdx;
}
