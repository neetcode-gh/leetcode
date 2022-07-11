//Same just reverse in the end.
//Reversing in the end is better than using add(0, E) in case of arraylist as it's an O(1) operation.

class Solution {

  public List<List<Integer>> levelOrderBottom(TreeNode root) {
    List<List<Integer>> ans = new ArrayList<>();
    if (root == null) return ans;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
      List<Integer> level = new ArrayList<>();
      int size = q.size();
      for (int i = 0; i < size; i++) {
        TreeNode cur = q.poll();
        level.add(cur.val);
        if (cur.left != null) q.offer(cur.left);
        if (cur.right != null) q.offer(cur.right);
      }
      ans.add(level);
    }
    int i = 0, j = ans.size() - 1;
    //reverse the list
    Collections.reverse(ans);
    return ans;
  }
}
