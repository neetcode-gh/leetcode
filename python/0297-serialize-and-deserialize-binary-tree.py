# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class Codec:
    def serialize(self, root):
        res = []

        def dfs(node):
            if not node:
                res.append("N")
                return
            res.append(str(node.val))
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        return ",".join(res)

    def deserialize(self, data):
        vals = data.split(",")

        def dfs():
            val = vals.pop(0)
            if val == "N":
                return None
            node = TreeNode(val=int(val))
            node.left = dfs()
            node.right = dfs()
            return node

        return dfs()
