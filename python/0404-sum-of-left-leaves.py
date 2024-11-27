# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:
        sum = 0
        #edge case: empty tree
        if not root:
            return 0
        queue  = deque([root])
        while queue:
            current = queue.popleft()
# Check if the left child is a leaf
            if current.left and not current.left.left and not current.left.right:
                sum+=current.left.val
                #add children to queueu if they exist
            if current.left:
                queue.append(current.left)
            if current.right:
                queue.append(current.right)
        return sum
        

        