class Solution {
    public ListNode mergeInBetween(ListNode list1, int a, int b, ListNode list2) {
        ListNode curr = list1;
        int i = 0;
        while (i < a - 1) {
            curr = curr.next;
            i++;
        }

        ListNode head = curr;
        while (i <= b) {
            curr = curr.next;
            i++;
        }
        head.next = list2;

        while (list2.next != null)
            list2 = list2.next;
        list2.next = curr;
        return list1;
    }
}
