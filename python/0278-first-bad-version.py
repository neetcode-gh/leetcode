class Solution:
    def firstBadVersion(self, n: int) -> int:
        low = 1
        high = n
        answer = None
        while low <= high:
            mid = (low + high) // 2
            is_bad = isBadVersion(mid)
            if is_bad:
                answer = mid
                high = mid -1
            else:
                low = mid + 1
        return answer