from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def is_happy_num(self, n: int) -> bool:
        slow, fast = n, self.sum_square_digits(n)

        print(slow, fast)
        while slow != fast:
            fast = self.sum_square_digits(fast)
            fast = self.sum_square_digits(fast)
            slow = self.sum_square_digits(slow)
            print(slow, fast)

        return True if fast == 1 else False

    def sum_square_digits(self, n):
        output = 0

        print(n, output)
        while n:
            output += (n % 10) ** 2
            n = n // 10
            print(n, output)
        return output


if __name__ == '__main__':
    solution = Solution()
    # print(solution.is_happy_num(2))
    print(solution.sum_square_digits(43))
