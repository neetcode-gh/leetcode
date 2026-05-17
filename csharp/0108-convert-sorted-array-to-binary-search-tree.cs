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
    private TreeNode ConvertToBST(int[] arrNums, int left, int right) {
        if (left > right) {
            return null;
        }

        int mid = left + (right - left) / 2; // use middle element for root
        TreeNode root = new TreeNode(arrNums[mid]); // establish root

        root.left = ConvertToBST(arrNums, left, mid - 1);   // Recurse for left sub tree
        root.right = ConvertToBST(arrNums, mid + 1, right); // Recurse for right subtree
        return root;
    }
    public TreeNode SortedArrayToBST(int[] nums) {
        return ConvertToBST(nums, 0, nums.Length - 1);
    }
}
