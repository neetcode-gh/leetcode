class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        result = []
        n = len(nums)
        if n == 0:
            return result

        # Pointer to the start of the current range
        start = 0
        
        for i in range(1, n + 1):  # Iterate until the end of the array
            # If we're at the end of the array or the range breaks
            if i == n or nums[i] != nums[i - 1] + 1:
                # Single number range
                if start == i - 1:
                    result.append(str(nums[start]))
                # Continuous range
                else:
                    result.append(f"{nums[start]}->{nums[i - 1]}")
                # Update start for the next range
                start = i
        
        return result