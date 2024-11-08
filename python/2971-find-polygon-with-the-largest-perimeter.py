# Time complexity O(nlogn)
class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        nums.sort()
        res = -1
        total = 0

        for n in nums:
            if total > n:
                res = total + n
            total += n
        
        return res

# Time complexity O(n + 30logn) ~ O(n)
class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        curSum = sum(nums)
        heapq._heapify_max(nums)

        while nums and curSum <= nums[0] * 2:
            curSum -= heapq._heappop_max(nums)
            
        return curSum if len(nums) > 2 else -1
        
