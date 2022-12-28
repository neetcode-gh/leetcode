class BSTIterator {

    TreeNode iterator;
    Queue<Integer> traversal;

    public BSTIterator(TreeNode root) {
        iterator = root;
        traversal = new ArrayDeque<>();
        fillStack(iterator);
    }

    public void fillStack(TreeNode iterator){
        if (iterator.left != null) {
            fillStack(iterator.left);
        }
        traversal.add(iterator.val);
        if (iterator.right != null) {
            fillStack(iterator.right);
        }
    }

    public int next() {
        while (!traversal.isEmpty()) {
            return traversal.poll();
        }
        return -1;
    }

    public boolean hasNext() {
        return !traversal.isEmpty();
    }
}