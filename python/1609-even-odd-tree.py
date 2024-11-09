class Solution:
    def isEvenOddTree(self, root: Optional[TreeNode]) -> bool:
        even = True
        q = deque([root])

        while q:
            prev = float("-inf") if even else float("inf")
            for _ in range(len(q)):
                node = q.popleft()

                if even and (node.val % 2 == 0 or node.val <= prev):
                    return False
                elif not even and (node.val % 2 == 1 or node.val >= prev):
                    return False
                
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
                prev = node.val
            even = not even
        return True
