class Solution:
    def minimizeMax(self, nums: List[int], p: int) -> int:
        nums.sort()

        def checkPair(mid):
            count, i = 0, 0

            while i < len(nums) - 1:
                if nums[i + 1] - nums[i] <= mid:
                    count += 1
                    i += 2
                else:
                    i += 1

            return count >= p

        left, right = 0, nums[-1] - nums[0]

        while left < right:
            mid = (left + right) // 2

            if checkPair(mid):
                right = mid
            else:
                left = mid + 1

        return left
