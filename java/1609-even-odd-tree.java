/*_____________________________
  Time Complexity: O(n)
  Space Complexity: O(n)
_______________________________*/

class Solution {
    public boolean isEvenOddTree(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        boolean evenLevel = true;

        while(!q.isEmpty()){
            int prev = (evenLevel)? Integer.MIN_VALUE: Integer.MAX_VALUE;
            int sz = q.size();

            for(int i = 0; i < sz; i++){
                TreeNode curr = q.poll();
                int nodeVal = curr.val;

                if((evenLevel && nodeVal % 2 == 0) || (!evenLevel && nodeVal % 2 != 0))
                    return false;
                if((evenLevel && nodeVal <= prev) || (!evenLevel && nodeVal >= prev))
                    return false;

                prev = nodeVal;    

                if(curr.left != null)
                    q.add(curr.left);
                if(curr.right != null)
                    q.add(curr.right);        
            }
            evenLevel = !evenLevel;
        }
        return true;
    }
}
