class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        // Iterative solution to solving this problem.
        
        if (root != null) {
            ArrayList<Integer> answer = new ArrayList<Integer>();
            Queue<TreeNode> queue = new LinkedList<TreeNode>();
            queue.add(root);
            
            while (!queue.isEmpty()) {
                int levelSize = queue.size();
                
                while (levelSize != 0) {
                    TreeNode currentNode = queue.remove();
                    
                    if (currentNode.left != null) {
                        queue.add(currentNode.left);
                    }
                    
                    if (currentNode.right != null) {
                        queue.add(currentNode.right);
                    }
                    
                    if (levelSize == 1) {
                        answer.add(currentNode.val);
                    }
                    
                    levelSize--;
                }
            }
            
            return answer;
        }
        
        return new ArrayList<Integer>();
        
    }
}
