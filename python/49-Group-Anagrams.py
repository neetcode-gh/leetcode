class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        d = defaultdict(list)
        
        for str in strs:
            k = ''.join(sorted(str))
            d[k].append(str)
            
        return d.values()
