class Solution {
    /**
     * BFS Solution with Runtime Complexity O(n) -> O(n log n)
     */
    public int[] findMode(TreeNode root) {
        if (root == null) return new int[0];
        List<Integer> curr = new ArrayList<>();
        Map<Integer, Integer> freqMap = new HashMap<>();
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int n = q.size();
            for (int i = 0; i < n; i++) {
                TreeNode node = q.poll();
                if (freqMap.containsKey(node.val))
                    freqMap.put(node.val, freqMap.get(node.val) + 1);
                else 
                    freqMap.put(node.val, 1);

                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }

        int currMax = 0;
        for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
            int key = entry.getKey();
            int value = entry.getValue();

            if (value > currMax) {
                curr.clear();
                curr.add(key);
                currMax = Math.max(currMax, value);
            } else if (value == currMax){
                curr.add(key);
            }
        }

        int[] res = new int[curr.size()];
        for (int j = 0; j < curr.size(); j++) {
            res[j] = curr.get(j);
        }
        return res;
    }
}