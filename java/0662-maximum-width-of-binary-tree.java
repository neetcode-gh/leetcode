class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        int res = 0;
        Queue<tuple> q = new LinkedList<>();
        q.add(new tuple(root, 1, 0));
        int prevLevel = 0, prevNum = 1;

        while(!q.isEmpty()){
            tuple curr = q.poll();
            TreeNode node = curr.node;
            int num = curr.num, level = curr.level;

            if(level > prevLevel){
                prevLevel = level;
                prevNum = num;
            }
            res = Math.max(res, num - prevNum + 1);
            if(node.left != null)
                q.add(new tuple(node.left, num*2, level + 1));
            if(node.right != null)
                q.add(new tuple(node.right, num*2 + 1, level + 1));    
        }
        return res;
    }
}
class tuple{
    TreeNode node;
    int num;
    int level;

    public tuple(TreeNode node, int num, int level){
        this.node = node;
        this.num = num;
        this.level = level;
    }
}
