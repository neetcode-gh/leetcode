from typing import List


from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def remove_duplicates(self, nums: List[int]) -> int:
        L = 1
        
        for R in range(1, len(nums)):

            print(L, R, 'nums: ', nums[L], nums[R], nums[R - 1]) if R == 1 else None
            if nums[R] != nums[R - 1]:
                nums[L] = nums[R]
                L += 1
                print(L, R, 'nums: ', nums[L], nums[R], nums[R - 1])
        return L


if __name__ == '__main__':
    s = Solution()
    given_list = [1]
    print(s.remove_duplicates(given_list))
