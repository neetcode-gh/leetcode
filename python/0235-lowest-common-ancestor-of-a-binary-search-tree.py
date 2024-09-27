from python.utils import TreeNode

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


from typing import List, Optional
import collections
from utils import TreeNode, SLLNode as ListNode

class Solution:
    def lowestCommonAncestor(
        self, root: "TreeNode", p: "TreeNode", q: "TreeNode"
    ) -> "TreeNode":

        while True:
            if root.val < p.val and root.val < q.val:
                root = root.right
            elif root.val > p.val and root.val > q.val:
                root = root.left
            else:
                return root


if __name__ == "__main__":
    # TODO: Sort these acc to question
    root2 = TreeNode(5) \
        .link_left(TreeNode(3)
                   .link_left(21)
                   .link_right(TreeNode(12)
                               .link_left(231)
                               .link_right(123))) \
        .link_right(TreeNode(4)
                    .link_left(TreeNode(2)
                               .link_left(43))
                    .link_right(1))

    sol = Solution()
    print(sol.lowestCommonAncestor(root2, TreeNode(4), TreeNode(7)).val)
