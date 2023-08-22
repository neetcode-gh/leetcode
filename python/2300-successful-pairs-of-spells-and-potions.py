class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        pairs = []
        potions.sort()
        n = len(potions)

        for i in range(len(spells)):
            l, r = 0, len(potions) - 1
            
            while l <= r:
                m = (l + r) // 2
                if spells[i] * potions[m] >= success:
                    r = m - 1
                else:
                    l = m + 1
            if l < len(potions):
                pairs.append(n - l)
            else:
                pairs.append(0)

        return pairs
        
        
