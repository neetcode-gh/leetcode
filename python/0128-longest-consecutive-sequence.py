class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        numSet = set(nums)
        longest = 0

        for n in nums:
            # check if its the start of a sequence
            if (n - 1) not in numSet:
                length = 1
                while (n + length) in numSet:
                    length += 1
                longest = max(length, longest)
        return longest
    def longestConsecutiveNoRepeat(self, nums: List[int]) -> int:
        numSet = set(nums)
        longest = 0 
        while len(numSet) > 0:
            cur = 0
            i = numSet.pop()
            numSet.add(i)
            while i - 1 in numSet:
                i -= 1
            while i in numSet:
                numSet.remove(i)
                cur += 1
                i += 1
            longest = max(cur, longest)
        return longest
