class Solution:
    def findGoodStrings(self, n: int, s1: str, s2: str, evil: str) -> int:
        a = ord('a')
        z = ord('z')
        
        arr_e = list(map(ord, evil))
        len_e = len(evil)
        next = [0] * len_e

        for i in range(1, len_e):
            j = next[i - 1]
            while j > 0 and evil[i] != evil[j]:
                j = next[j - 1]
            if evil[i] == evil[j]:
                next[i] = j + 1

        def good(s):
            arr = list(map(ord, s))
            len_a = len(arr)

            @cache
            def f(i, skip, reach, e):
                if e == len_e:
                    return 0
                if i == len_a:
                    return 0 if skip else 1

                limit = arr[i] if reach else z
                ans = 0

                if skip:
                    ans += f(i + 1, True, False, 0)

                for c in range(a, limit + 1):
                    ee = e
                    while ee > 0 and arr_e[ee] != c:
                        ee = next[ee - 1] 

                    if arr_e[ee] == c:
                        ee += 1

                    ans += f(i + 1, False, reach and c == limit, ee)

                return ans % int(1e9 + 7)

            return f(0, True, True, 0)

        return (good(s2) - good(s1) + int(evil not in s1)) % int(1e9 + 7)
