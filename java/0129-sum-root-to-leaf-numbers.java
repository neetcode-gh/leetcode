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
    /*
        Time complexity: O(V) where V is the number of vertices
        Space complexity: O(V) where V is the number of vertices
    */

    // keep track of the different root to node values as a string
    List<String> rootToLeafs = new ArrayList<String>();

    public int sumNumbers(TreeNode root) {
        // track the sum that we want to add
        int solution = 0;

        String currentPath = "";

        // execute a dfs to find the leaf nodes
        findLeafNodes(root, currentPath);

        // loop through all the paths, convert to int, add to solution
        for(String curr:rootToLeafs){
            // save the current string as an integer
            int currentVal = Integer.parseInt(curr);

            // add the current value to the solution
            solution+=currentVal;
        }

        // return the solution
        return solution;
    }

    // dfs method
    public void findLeafNodes(TreeNode node, String currentPath){
        // base case, if no node then return
        if(node==null){
            return;
        }

        // add the current node value to the currentPath string
        currentPath+=Integer.toString(node.val);

        // check the left most value
        findLeafNodes(node.left, currentPath);

        // check the right most value
        findLeafNodes(node.right, currentPath);

        // if we are at a non-null node, check if it is a leaf
        if(node.left==null && node.right==null){
            // add the currentPath to the arraylist
            rootToLeafs.add(currentPath);
        }
    }
}