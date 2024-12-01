class Solution:
    def tree2str(self, root: Optional[TreeNode]) -> str:
        # Solution with O(n) time and space complexity
        res = []
        self.dfs(root, res)
        return "".join(res)

    def dfs(self, t: TreeNode, res: list):
        # If the current node is None, do nothing and return
        if t is None:
            return
        res.append(str(t.val))

        # If both left and right children are None, return as there are no more branches to explore
        if t.left is None and t.right is None:
            return
        res.append('(')

        # Recursively call the DFS function for the left child
        self.dfs(t.left, res)
        res.append(')')

        # If the right child exists, process it
        if t.right is not None:
            res.append('(')

            # Recursively call the DFS function for the right child
            self.dfs(t.right, res)
            res.append(')')
            