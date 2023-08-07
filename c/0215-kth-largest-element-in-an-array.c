// Function to partition the array using Lomuto partition scheme
int partition(int* nums, int left, int right) {
    int pivot = nums[right];
    int i = left - 1;

    for (int j = left; j < right; j++) {
        if (nums[j] <= pivot) {
            i++;
            int temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
    }

    int temp = nums[i + 1];
    nums[i + 1] = nums[right];
    nums[right] = temp;

    return i + 1;
}

// Function to find the kth largest element using Quickselect
int quickSelect(int* nums, int left, int right, int k) {
    if (left <= right) {
        int partitionIndex = partition(nums, left, right);

        if (partitionIndex == k) {
            return nums[partitionIndex];
        } else if (partitionIndex > k) {
            return quickSelect(nums, left, partitionIndex - 1, k);
        } else {
            return quickSelect(nums, partitionIndex + 1, right, k);
        }
    }

    return -1; // Invalid case
}

int findKthLargest(int* nums, int numsSize, int k) {
    return quickSelect(nums, 0, numsSize - 1, numsSize - k);
}
