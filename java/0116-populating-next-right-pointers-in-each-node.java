class Solution {
    public Node connect(Node root) {
        Node current = root;
        Node next = root == null ? null : root.left;

        while (current != null && next != null) {
            current.left.next = current.right;

            if (current.next != null) {
                current.right.next = current.next.left;
            }

            current = current.next;

            if (current == null) {
                current = next;
                next = current.left;
            }
        }

        return root;
    }
}
