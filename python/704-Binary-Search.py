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

        # could also use a recursive approach
        def recursive_binary_search(start, end):
            mid_index = start + ((end - start) // 2)

            if start > end:
                return -1
            elif target == nums[mid_index]:
                return mid_index
            elif target < nums[mid_index]:
                return recursive_binary_search(start, mid_index - 1)
            elif target > nums[mid_index]:
                return recursive_binary_search(mid_index + 1, end)

        return recursive_binary_search(start=0, end=len(nums) - 1)
