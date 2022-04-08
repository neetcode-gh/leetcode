class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        
        if len(s)!=len(t):
            return False
        
        char_map = {}
        for i in s:
            char_map[i]=char_map.get(i,0)+1
            
        for i in t:
            if i in char_map:
                char_map[i]-=1
                
                
        for i in char_map.values():
            if i!=0:
                return False
            
        return True
