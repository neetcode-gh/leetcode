class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        
        startIndex = 0
        pMap, sMap = {}, {}
        res = []
        
        for char in p:
            pMap[char] = 1 + pMap.get(char, 0)
        
        for i in range(len(s)):
            sMap[s[i]] = 1 + sMap.get(s[i], 0)

            if i >= len(p) - 1:
                if sMap == pMap:
                    res.append(startIndex)
                
                # If current character is in sMap, remove it and re-update the map.
                if s[startIndex] in sMap:
                    sMap[s[startIndex]] -= 1
                    if sMap[s[startIndex]] == 0:
                        del sMap[s[startIndex]]
                startIndex += 1
        
        return res