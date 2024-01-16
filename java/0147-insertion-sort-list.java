class Solution {
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(0, head);

        ListNode prev = head;
        ListNode cur = head.next;
        while (cur != null) {
            if (prev.val <= cur.val) {
                prev = cur;
                cur = cur.next;
            } else {
                ListNode elem = dummy;
                while (elem.next.val < cur.val) {
                    elem = elem.next;
                }

                prev.next = cur.next;
                cur.next = elem.next;
                elem.next = cur;

                cur = prev.next;
            }
        }

        return dummy.next;
    }
}
