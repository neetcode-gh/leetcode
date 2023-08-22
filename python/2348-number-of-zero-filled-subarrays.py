class Solution(object):
    def zeroFilledSubarray(self, nums):
        # check if there are any Zeros in the list
        res = nums.count(0)
        if res == 0:
            return 0
             
        r = 0
        l = len(nums)
        while r < l:
            Temp_Subarray=[]
            while r < l and nums[r] == 0:
                Temp_Subarray.append(nums[r])
                r += 1
            if len(Temp_Subarray) > 1:
                Temp_Count =  len(Temp_Subarray) * ( len(Temp_Subarray) - 1 ) / 2 
                res += int(Temp_Count)

            r += 1
        return res
