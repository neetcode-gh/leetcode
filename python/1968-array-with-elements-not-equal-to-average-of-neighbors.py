class Solution:
    # Solution 1: Sort and fill
    # Intuition:
    # Ensure the below pattern (no Avg number can form at nums[i]:
    # nums[i-1] < nums[i] > nums[i+1]

    # Input: nums = [6,2,0,9,7]
    # Sorted nums = [0,2,6,7,9]
    # 1st Filled arr = [0,_,2,_,6]
    # 2nd Filled arr = [0,7,2,9,6]

    def rearrangeArray(self, nums: List[int]) -> List[int]:
        nums.sort()

        i, j, n = 0, 0, len(nums)
        ans = [0]*n

        while i < n and j < n:
            ans[i] = nums[j]
            i = i + 2
            j = j + 1

        i = 1
        while i < n and j < n:
            ans[i] = nums[j]
            i = i + 2
            j = j + 1

        return ans
    