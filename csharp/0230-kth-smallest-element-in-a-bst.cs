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
    public int KthSmallest(TreeNode root, int k) {
        var result = -1;
        var inorderStack = new Stack<TreeNode>();
        
        var cur = root;
        
        while(cur != null || inorderStack.Count > 0) {
            while(cur != null) {
                inorderStack.Push(cur);
                cur = cur.left;
            }
            cur = inorderStack.Pop();
            
            k--;
            if(k == 0) {
                result = cur.val;
                break;
            }
            cur = cur.right; 
        }
        return result;
    }
}