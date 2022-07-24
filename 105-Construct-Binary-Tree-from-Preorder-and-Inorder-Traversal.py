class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        inorder_index_mapping = {}
        for k, v in enumerate(inorder):
            inorder_index_mapping[v] = k
        index = 0

        def buildtree(left, right):
            nonlocal index
            if left > right:
                return None
            root_val = preorder[index]
            root = TreeNode(root_val)
            index += 1
            root.left = buildtree(left, inorder_index_mapping[root_val] - 1)
            root.right = buildtree(inorder_index_mapping[root_val] + 1, right)
            return root

        return buildtree(0, len(preorder) - 1)
