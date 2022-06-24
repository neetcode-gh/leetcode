class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        #Solution 1 (nlogn) Time, len(t)+len(s) in Memory space
        return sorted(s)==sorted(t)
        #Solution 2 (n) Time, len(t) or len(s) extra space
        if len(s)!=len(t):
            return False
        dict={}
        for char in s:
            dict[char]+=dict.get(char,0)+1
        c=0
        for char in t:
            if dict.get(char):
                dict[char]-=1
                if dict[char]==0:
                    c+=1
                if dict[char]<0:
                    return False
            else:
                return False
        
        return c==len(dict)


    
        
        
        
