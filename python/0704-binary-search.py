class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            m = l + ((r - l) // 2)  # (l + r) // 2 can lead to overflow
            if nums[m] > target:
                r = m - 1
            elif nums[m] < target:
                l = m + 1
            else:
                return m
        return -1

# Binary search algorithm:
# Use two pointers, `left` and `right`, to represent the start and end of the search space respectively.
# Continuously adjust the pointers based on comparisons with the middle element. 
# Calculate the middle index using `(left + right) // 2`.
# If the middle element equals the target, return its index.
# If the middle element is less than the target, adjust `left` to `mid + 1`.
# If the middle element is greater than the target, adjust `right` to `mid - 1`.
# Repeat until `left` is greater than `right`, indicating the target is not found, then return -1.
# This approach achieves O(log n) runtime complexity by halving the search space in each iteration.
