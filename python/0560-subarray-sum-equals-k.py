class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        count = 0
        sum = 0
        dic = {}
        dic[0] = 1
        for i in range(len(nums)):
            sum += nums[i]
            if sum-k in dic:
                count += dic[sum-k]
            dic[sum] = dic.get(sum, 0)+1
        return count

# Time Complexity :
#     O(N) -> Where N is the size of the array and we are iterating over the array once

# Space Complexity:
#     O(N) -> Creating a hashmap/dictionary
