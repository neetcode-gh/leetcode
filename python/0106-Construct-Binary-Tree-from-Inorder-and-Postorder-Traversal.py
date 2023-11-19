# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        
        inOrderIndexMap = {} # map node to its index in the inorder array.
        postorderIndex = len(postorder)-1

        for ix,node in enumerate(inorder):
            inOrderIndexMap[node] = ix
        
        def arrayToTree(left, right):
            nonlocal postorderIndex # required to track updates in the global variable.
            if left>right:
                return None
            
            rootVal = postorder[postorderIndex] # contains root node.
            root = TreeNode(rootVal)
            postorderIndex-= 1
            
            root.right = arrayToTree(inOrderIndexMap[rootVal]+1, right) # build right subtree.
            root.left = arrayToTree(left, inOrderIndexMap[rootVal]-1) # build left subtree.

            return root
        
        return arrayToTree(0, len(postorder)-1)
