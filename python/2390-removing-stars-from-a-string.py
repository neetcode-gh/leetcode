# https://leetcode.com/problems/removing-stars-from-a-string/submissions/1011668695/
class Solution(object) :
    def removeStars(self, s) :
        res = []
        for c in s :
            if res and c == '*':
                res.pop()
            else:
                res.append(c)
        return ''.join(res)
