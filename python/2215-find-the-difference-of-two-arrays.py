# Time Complexity: O(m + n), we check each element of nums1Set and nums2Set
# Space Complexity: O(m + n), where m and n are length sets in worst case.

from typing import List  # ignore this, just for typing


class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        nums1_set = set(nums1)
        nums2_set = set(nums2)

        lst1 = [num for num in nums1_set if num not in nums2_set]
        lst2 = [num for num in nums2_set if num not in nums1_set]

        return [lst1, lst2]
