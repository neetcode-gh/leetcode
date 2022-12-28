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
    public IList<int> RightSideView(TreeNode root) {
        var result = new List<int>();
        if(root == null) 
            return result;
        var q = new Queue<TreeNode>();
        q.Enqueue(root);
        
        // traverse the tree using BFS
        while(true) {
            var count = q.Count;
            if(count == 0) break;
            
            for(var i = 0; i < count; i++) {
                var cur = q. Dequeue();
                
                if(cur.left != null)
                    q.Enqueue(cur.left);
                if(cur.right != null) 
                    q.Enqueue(cur.right);
                
                
                // only add the last node from each level, i.e the rightmost node
                if(i == count - 1) {
                    result.Add(cur.val);
                }
            }
        }
        
        return result;
    }
}