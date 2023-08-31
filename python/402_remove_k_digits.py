class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        res = [num[0]]
        for n in num[1:]:
            while k and res and int(res[-1]) > int(n):
                res.pop()
                k -= 1
            res.append(n)

        while k and res:
            res.pop()
            k -= 1

        res = ''.join(res)
        res = res.lstrip('0') or '0'
        return res
