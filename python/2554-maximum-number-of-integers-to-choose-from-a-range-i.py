class Solution:
    def maxCount(self, banned: List[int], n: int, maxSum: int) -> int:
        nums = {x:1 for x in range(1, n + 1)} # hashmap for storing the required elements
        for i in banned:
            if nums.get(i):
                del nums[i]
        sum = 0
        count = 0
        for i in nums:
            sum += i
            if sum <= maxSum:
                count += 1
            else:
                break
        return count
