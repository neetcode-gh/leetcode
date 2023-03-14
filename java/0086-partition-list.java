class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode head1 = new ListNode(); // will store node.value < x
        ListNode head2 = new ListNode(); // will store node.value >= x

        ListNode tail1 = head1, tail2 = head2, curr = head;

        while (curr != null) {
            if (curr.val < x) {
                tail1.next = curr;
                tail1 = tail1.next;
            } else {
                tail2.next = curr;
                tail2 = tail2.next;
            }
            curr = curr.next;
        }
        // at this point the two lists are not connected the way we want them to
        // we'll need to connect the list with values<x to list with values >= x
        // also the last node (tail2) is currently pointing to some random node but it
        // should point to null
        tail1.next = head2.next;
        tail2.next = null;
        return head1.next;
    }
}