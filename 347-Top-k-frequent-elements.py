class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        j = {}
        l= []
        
        #Store count of all values in dict
        for i in range(len(nums)):
            j[nums[i]] = 1+ j.get(nums[i],0)
        
        # Search of top K keys in j
        for key,value in j.items():
            if value in (sorted(j.values(), reverse=True)[0:k]):
                l.append(key)
        return l
