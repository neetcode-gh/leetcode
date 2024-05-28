class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        
        #Sliding window solution

        target = sum(nums) - x #This is the target sum of the inner array

        if target<0:
            return -1 #Even if we remove all nums from x, its still >0
        if target == 0:
            return len(nums) #We have to remove every element from nums to make x=0
        
        curr_sum = 0 #Stores sum of inner arrray
        start = 0 #for sliding window
        max_len = -1 #Stores length of the longest inner array (least elements popped)

        for end in range(len(nums)): #Sliding window from the right
            curr_sum += nums[end]

            while curr_sum>target and start<=end:#If curr sum is too big, slide window from left
                curr_sum -= nums[start]
                start +=1


            if curr_sum == target:
                max_len = max(max_len, end-start+1) #compare current longest and new longest

        if max_len != -1: #true if curr_sum ever equaled target and max_len was changed
            return len(nums) - max_len
        else:
            return -1 