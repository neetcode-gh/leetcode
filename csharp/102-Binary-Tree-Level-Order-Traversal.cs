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
    public IList<IList<int>> LevelOrder(TreeNode root) {
        var result = new List<IList<int>>();
        if(root == null) return result;
        
        var q = new Queue<TreeNode>();
        q.Enqueue(root);
        
        while(true) {
            var curLevelCount = q.Count;
            if(curLevelCount == 0) break;
            var curNodes = new List<int>();
            while(curLevelCount > 0) {
                var cur = q.Dequeue();
                curNodes.Add(cur.val);
                
                if(cur.left != null) 
                    q.Enqueue(cur.left);
                
                if(cur.right != null) 
                    q.Enqueue(cur.right);
                curLevelCount--;
            }
            result.Add(curNodes);
        }
        
        return result;
    }
}