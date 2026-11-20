# Hash Map (One Pass)
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}  # val -> index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i


# Hash Map (Two Pass)
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        indices = {}  # val -> index
         
        for i, n in enumerate(nums):
            indices.setdefault(n, []).append(i)
        
        for i, n in enumerate(nums):
            diff = target - n
            
            # Temporarily pop current num "n" from map
            indices[n].remove(i)
            result = indices.get(diff, [])
            if result:
                return [i, result[0]]

            # If diff not found, add current num "n" back to map
            indices[n].append(i)
        
