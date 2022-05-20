class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        
        if len(s) != len(t):
            return False
        
        #  sort strings by their ascii values
        s = "".join(sorted(s))
        t = "".join(sorted(t))
        
        # if the sorted strings are identical, then they are anagrams
        if s == t:
            return True
        
        
        
