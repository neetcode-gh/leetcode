class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:

        nums.sort()
        best = float('inf')
        
        for i in range(len(nums) - 2):
            
            val = nums[i]
            left = i + 1
            right = len(nums) - 1
            
            while left < right:
                
                currentGap = abs(target - (val + nums[left] + nums[right]))
                
                if abs(best - target) > currentGap:
                    best = val + nums[left] + nums[right]
                if val + nums[left] + nums[right] < target:
                    left += 1
                elif val + nums[left] + nums[right] > target:
                    right -= 1
                else: #closest it can get 
                    return target                
                
        return best
