class Solution:
    def maximumRemovals(self, s: str, p: str, removable: list[int]) -> int:
        return self.binary_search(s, p, removable)

    def is_subsequence(self, s: str, p: str, removable: list[int], k: int) -> bool:
        removed_set = set(removable[:k])

        i, j = 0, 0
        while i < len(s) and j < len(p):
            if i in removed_set or s[i] != p[j]:
                i += 1
            else:
                i += 1
                j += 1
        return j == len(p)

    def binary_search(self, s: str, p: str, removable: list[int]) -> int:
        left, right = 0, len(removable) + 1

        while left < right:
            mid = (left + right) // 2
            if self.is_subsequence(s, p, removable, mid):
                left = mid + 1
            else:
                right = mid

        return left - 1
