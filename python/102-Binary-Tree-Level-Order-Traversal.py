# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        q = collections.deque()
        if root: q.append(root)
            
        while q:
            val = []
            
            for i in range(len(q)):
                node = q.popleft()
                val.append(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(val)
        return res
