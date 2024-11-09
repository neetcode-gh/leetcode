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

    static void preOrder(TreeNode root, List<Integer> res){


        if(root == null){
            return;
        }
        res.add(root.val);
        preOrder(root.left,res);
        preOrder(root.right,res);

    }

    public List<Integer> preorderTraversal(TreeNode root) {

        List<Integer> res = new ArrayList<>();

        preOrder(root,res);

        return res;

    }
}