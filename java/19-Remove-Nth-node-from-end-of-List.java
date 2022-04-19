/*
    Name - Remove Nth Node From End of List
    Link - https://leetcode.com/problems/remove-nth-node-from-end-of-list/
    Condition - Could you do this in one pass?
    Time Complexity - O(n)
    Space Complexity - o(1)
    Note - Fast and slow pointer technique
*/

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int k) {
        ListNode start = new ListNode(0);

        ListNode slow = start;
        ListNode fast = start;
        slow.next = head;

        //Move fast in front so that the gap between slow and fast becomes n
        for (int i = 1; i <= k + 1; i++) {
            fast = fast.next;
        }
        //Move fast to the end, maintaining the gap
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        //Skip the desired node
        slow.next = slow.next.next;
        return start.next;
    }
}