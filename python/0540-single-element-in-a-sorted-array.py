class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        def is_non_duplicate(i):
            is_left_different = i == 0 or nums[i-1] != nums[i]
            is_right_different = i == len(nums)-1 or nums[i+1] != nums[i]
            return is_left_different and is_right_different

        if len(nums) == 1:
            return nums[0]

        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if is_non_duplicate(mid):
                return nums[mid]

            if mid % 2 == 0:
                if nums[mid+1] == nums[mid]:
                    l = mid + 1
                else:
                    r = mid - 1
            else:
                if nums[mid+1] == nums[mid]:
                    r = mid - 1
                else:
                    l = mid + 1
  
