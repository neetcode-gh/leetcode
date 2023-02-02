class Solution(object):
    def removeElement(self, nums, val):
        """
        :type nums: List[int]
        :type val: int
        :rtype: int
        """
        lptr = 0
        for rptr in range(len(nums)):
            if nums[rptr] == val:
                continue
            else:
                nums[lptr] = nums[rptr]
                lptr += 1

        return lptr
