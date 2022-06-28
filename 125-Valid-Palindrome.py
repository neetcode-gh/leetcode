from string import ascii_lowercase, digits


class Solution:
    def isPalindrome(self, s: str) -> bool:
        st = "".join(
            i.lower() if i.lower() in ascii_lowercase + digits else "" for i in s
        )
        l, r = 0, len(st) - 1
        while l < r:
            if st[l] != st[r]:
                return False
            l += 1
            r -= 1
        return True
