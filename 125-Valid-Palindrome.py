class Solution:
    def isPalindrome(self, s: str) -> bool:
        l = 0
        r = len(s)-1
        while l<r:
            if s[l].lower()==s[r].lower():
                l+=1
                r-=1
                continue
            
            elif not (65<=ord(s[l])<=90 or 97<=ord(s[l])<=122 or 48<=ord(s[l])<=57):
                l+=1
            elif  not (65<=ord(s[r])<=90 or 97<=ord(s[r])<=122 or 48<=ord(s[r])<=57):
                r-=1
            else:
                return False
        return True
