//Just store the value for parent values of the nodes in a map and just do bfs as we do in graph.

class Solution {

    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        HashMap<TreeNode, TreeNode> map = new HashMap<>();
        //First bfs to make a mapping to the parent nodes
        Queue<TreeNode> q1 = new LinkedList<>();
        q1.offer(root);
        while (!q1.isEmpty()) {
            int size = q1.size();
            for (int i = 0; i < size; i++) {
                TreeNode cur = q1.poll();
                if (cur.left != null) {
                    q1.offer(cur.left);
                    map.put(cur.left, cur);
                }
                if (cur.right != null) {
                    q1.offer(cur.right);
                    map.put(cur.right, cur);
                }
            }
        }
        //Now do the bfs
        //Same as we do in graphs with a visited set
        Queue<TreeNode> q2 = new LinkedList<>();
        HashSet<TreeNode> vis = new HashSet<>();
        List<Integer> ans = new ArrayList<>();
        int dis = 0;
        q2.offer(target);
        while (!q2.isEmpty()) {
            int size = q2.size();
            for (int i = 0; i < size; i++) {
                TreeNode cur = q2.poll();
                if (!vis.contains(cur)) {
                    if (cur.left != null) q2.offer(cur.left);
                    if (cur.right != null) q2.offer(cur.right);
                    if (map.get(cur) != null) q2.offer(map.get(cur));
                    if (dis == k) {
                        ans.add(cur.val);
                    }
                }
                vis.add(cur);
            }
            dis++;
        }
        return ans;
    }
}
