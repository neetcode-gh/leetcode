# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        queue = collections.deque()
        if root:
            queue.append(root)
        
        while queue:
            for i in range(len(queue)):
                node = queue.popleft()
                queue.append(node.left) if node.left else None
                queue.append(node.right) if node.right else None
            res.append(node.val)
 
        return res
