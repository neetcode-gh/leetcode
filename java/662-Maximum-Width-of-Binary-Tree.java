//This solution helped https://leetcode.com/problems/maximum-width-of-binary-tree/discuss/106645/C%2B%2BJava-*-BFSDFS3liner-Clean-Code-With-Explanation
//This video helped https://www.youtube.com/watch?v=ZbybYvcVLks&ab_channel=takeUforward

class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        Queue<Pair<TreeNode, Integer>> q = new LinkedList<>();
        int maxWidth = 0;
        q.offer(new Pair(root, 1));
        while (!q.isEmpty()) {
            int l = q.peek().getValue();
            int r = l;
            int size = q.size();
            for (int i = 0; i<size; i++) {
                TreeNode cur = q.peek().getKey();
                r = q.poll().getValue();
                if (cur.left!=null) 
                    q.offer(new Pair(cur.left, 2*r));
                if (cur.right!=null) 
                    q.offer(new Pair(cur.right, 2*r+1));
            }
            maxWidth = Math.max(maxWidth, r-l+1);
        }
        return maxWidth;
    }
}
