class Solution:
    def partitionString(self, s: str) -> int:
        c=0
        res=set()
        for i in s:
            if i in res:
                c=c+1
                res=set()
            res.add(i)
        return c+1
