class Solution(object):
    def isSubsequence(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        currentIndex = -1
        for c in s:
            currentIndex = t.find(c, currentIndex+1)
            if currentIndex == -1:
                return False 
        return True                