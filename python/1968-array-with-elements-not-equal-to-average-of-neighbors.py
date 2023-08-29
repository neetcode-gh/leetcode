class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        left = 0
        while left < len(nums) - 2:
            if nums[left: left + 3] == sorted(nums[left: left + 3]) or nums[left: left + 3] == sorted(nums[left: left + 3], reverse= True):
                nums[left + 1], nums[left + 2] = nums[left + 2], nums[left + 1]
            left += 1
        return nums
