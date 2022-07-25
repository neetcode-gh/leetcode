# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class Solution:
    res = None

    def lowestCommonAncestor(
        self, root: "TreeNode", p: "TreeNode", q: "TreeNode"
    ) -> "TreeNode":
        if not root or not p or not q:
            return None

        def search(root, p, q):
            if not root:
                return False
            mid = left = right = False
            if root.val == p.val or root.val == q.val:
                mid = True

            left = search(root.left, p, q)
            right = search(root.right, p, q)
            if mid:
                if left or right:
                    self.res = root
            elif left and right:
                self.res = root
            return mid or left or right

        search(root, p, q)
        return self.res
