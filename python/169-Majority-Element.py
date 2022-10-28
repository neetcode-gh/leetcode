class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        return sorted(nums)[len(nums) >> 1]