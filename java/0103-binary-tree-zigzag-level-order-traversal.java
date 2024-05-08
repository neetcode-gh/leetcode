class Solution {
    boolean reverse = false; // flag to detrmine the direction left or right
    List<List<Integer>> sol = new ArrayList<List<Integer>>();
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        if(root == null){return sol;}
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while( !queue.isEmpty()){  
            List<Integer> temp = new ArrayList<Integer>();
            int size =queue.size();
            for(int i=0; i < size; i++){
                TreeNode node = queue.poll();
                temp.add(node.val);
                if(node.left != null){
                    queue.add(node.left);
                }
                if(node.right != null){
                    queue.add(node.right);
                }
            }
            if(reverse){
                Collections.reverse(temp);
            }
            reverse = !reverse;
            sol.add(temp);
        }
        return sol;
    }

}