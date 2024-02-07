from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        value_to_index = {}  # Store value -> index mapping

        for i, n in enumerate(nums):
            complement = target - n
            if complement in value_to_index:
                return [value_to_index[complement], i]
            value_to_index[n] = i

        return []