/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    //This would be easily solved by DFS and then compairing the values
    public boolean dfs(TreeNode root, int targetSum, int currSum){
        if(root == null) return false;

        currSum += root.val;
        if(root.left == null && root.right == null){
            return (currSum == targetSum);
        }
        return dfs(root.left, targetSum, currSum) || dfs(root.right, targetSum, currSum);
    }
    public boolean hasPathSum(TreeNode root, int targetSum) {
        return dfs(root, targetSum, 0);
    }
}


/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    private boolean isLeafNode(TreeNode node) {
        return ((node.left == null) && (node.right == null));
    }

    public boolean hasPathSum(TreeNode root, int targetSum) {
        // Edge case: No nodes
        if(root == null) {
            return false;
        }

        targetSum -= root.val;
        if(isLeafNode(root)) {
            return (targetSum == 0);
        }
        return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
    }
}
