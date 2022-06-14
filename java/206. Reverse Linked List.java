//Use three pointers and so you can change the next of the mid to the first one without losing the track of the original left.
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode p = null;
        ListNode q = null;
        ListNode r = head;
        while (r!=null) {
            p = q;
            q = r;
            r = r.next;
            q.next = p;
        }
        return q;
    }
}
