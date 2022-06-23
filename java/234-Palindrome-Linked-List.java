class Solution {
    public boolean isPalindrome(ListNode head) {

        ListNode fast = head;
        ListNode slow = head;

        while (fast != null && fast.next != null) {

            // fast pointer shifted twice
            fast = fast.next;
            fast = fast.next;

            // slow pointer shifted only once
            slow = slow.next;

        }

        // reverse second half
        ListNode prev = null;
        while (slow != null) {
            ListNode tmp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = tmp;
        }

        ListNode left = head;
        ListNode right = prev;

        while (right != null) {
            if (left.val != right.val) {
                return false;
            }

            left = left.next;
            right = right.next;

        }

        return true;

    }
}