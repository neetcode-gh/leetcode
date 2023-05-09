class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return not(len(set(nums)) == len(nums))
