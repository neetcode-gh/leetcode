class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:        
        counts = dict()
        for c in s1: counts[c] = counts.get(c,0) + 1

        l = 0
        for r in range(len(s2)):            
            if s2[r] not in counts:
                while l < r:
                    counts[s2[l]] += 1                
                    l += 1                    
                l = r+1
                continue
            
            counts[s2[r]] -= 1            
            while counts[s2[r]] < 0:
                counts[s2[l]] += 1                
                l += 1                
            
            if r-l+1 == len(s1):
                return True                        
        return False
