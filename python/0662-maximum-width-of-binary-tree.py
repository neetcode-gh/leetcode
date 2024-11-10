# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0

        q = [(root, 0)]
        width = 0
        while q:
            leftIndex = q[0][1]
            rightIndex = q[-1][1]
            width = max(width, rightIndex - leftIndex + 1)

            for _ in range(len(q)):
                node, index = q.pop(0)
                if node.left:
                    q.append((node.left, index * 2))
                if node.right:
                    q.append((node.right, index * 2 + 1))
        return width
