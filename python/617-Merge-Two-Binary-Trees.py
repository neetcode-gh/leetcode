# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def mergeTrees(self, t1: TreeNode, t2: TreeNode) -> TreeNode:
        if not t1:
            return t2
        if not t2:
            return t1
        
        t1.val += t2.val if t2 else 0
        
        t1.left = self.mergeTrees(t1.left, t2.left)
        t2.right = self.mergeTrees(t1.right, t2.right)
        
        return t1
'''
Time: O(n) where n is the minimum number of nodes from the two given trees
Space: O(m) depth of the call stack can go upto m where m is the height of the tree
'''
