//Apply Breadth first search.
//Asked in Amazon and Meta
class Solution {

    public List<Double> averageOfLevels(TreeNode root) {
        List<Double> ans = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList();
        q.offer(root);
        while (!q.isEmpty()) {
            int queue_size = q.size();
            double avg = 0;
            for (int i = 0; i < queue_size; i++) {
                TreeNode cur = q.poll();
                avg += cur.val;
                if (cur.left != null) q.offer(cur.left);
                if (cur.right != null) q.offer(cur.right);
            }
            ans.add(avg / queue_size);
        }
        return ans;
    }
}
