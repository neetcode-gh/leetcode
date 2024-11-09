# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root.left and not root.right:
            return True
        queueLeft = deque()
        queueRight = deque()

        queueLeft.appendleft(root.left)
        queueRight.appendleft(root.right)

        while queueLeft and queueRight:
            nodeLeft, nodeRight = queueLeft.pop(), queueRight.pop()
            if not nodeLeft and not nodeRight:
                continue
            # both node must exist
            # if exists thet must have the same value
            if not nodeLeft or not nodeRight or nodeLeft.val != nodeRight.val:
                return False

            queueLeft.appendleft(nodeLeft.left)
            queueLeft.appendleft(nodeLeft.right)

            queueRight.appendleft(nodeRight.right)
            queueRight.appendleft(nodeRight.left)
        return not (queueLeft or queueRight)
