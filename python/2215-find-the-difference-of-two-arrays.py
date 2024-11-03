# Time Complexiy: O(m + n)
# Space Complexity: O(m + n)
class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        nums1 = set(nums1)
        nums2 = set(nums2)
        table = {}
        for _, val in enumerate(nums2):
            table[val] = 1

        unik1 = []
        unik2 = []
        for i in nums1:
            if i in table:
                table[i] += 1
            else:
                unik1.append(i)
        
        for key, val in table.items():
            if val == 1:
                unik2.append(key)
        return [unik1, unik2]

      
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

