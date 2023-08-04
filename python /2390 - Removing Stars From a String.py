class Solution(object) :
    def removeStars(self, s) :
        res = []
        for c in s :
            if res and c == '*':
                res.pop()
            else:
                res.append(c)
        return ''.join(res)
