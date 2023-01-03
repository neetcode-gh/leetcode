/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public IList<int> InorderTraversal(TreeNode root) {
        // return InorderTraversalRecursive(root).ToList();
        return InorderTraversalIterative(root).ToList();
    }

    // Time: O(n)
    // Space: O(n)
    private IEnumerable<int> InorderTraversalRecursive(TreeNode node) {
        if (node == null) {
            return Enumerable.Empty<int>();
        }

        return InorderTraversalRecursive(node.left)
            .Append(node.val)
            .Concat(InorderTraversalRecursive(node.right));
    }

    // Time: O(n)
    // Space: O(n)
    private IEnumerable<int> InorderTraversalIterative(TreeNode node) {
        List<int> result = new();
        Stack<TreeNode> stack = new();
        while (node != null || stack.Any()) {
            while (node != null) {
                stack.Push(node);
                node = node.left;
            }
            node = stack.Pop();
            result.Add(node.val);
            node = node.right;
        }
        return result;
    }
}
