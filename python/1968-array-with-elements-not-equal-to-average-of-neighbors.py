class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        """itype: List[int]
        rtype: List[int]
        checking the average of two adjacent
        numbers of a number is not equal.
        """
        for idx in range(1, len(nums)-1):
            if (nums[idx-1] > nums[idx] > nums[idx+1]):
                nums[idx] = nums[idx] ^ nums[idx+1]
                nums[idx+1] = nums[idx] ^ nums[idx+1]
                nums[idx] = nums[idx] ^ nums[idx+1]
            if (nums[idx-1] < nums[idx] < nums[idx+1]):
                nums[idx] = nums[idx] ^ nums[idx+1]
                nums[idx+1] = nums[idx] ^ nums[idx+1]
                nums[idx] = nums[idx] ^ nums[idx+1]
        return nums
