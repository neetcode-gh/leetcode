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