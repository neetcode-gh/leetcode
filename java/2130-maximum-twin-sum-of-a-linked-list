//The basic idea is to use the slow and fast pointers to find the mid
// Once found we will reverse the second half of the Linkedlist and compare the values

class Solution {
    public ListNode reverse(ListNode head){
        if(head == null) return head;

        ListNode curr = head;
        ListNode prev = null;

        while(curr != null){
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
    public int pairSum(ListNode head) {
        int mx = Integer.MIN_VALUE;

        ListNode slow=head, fast=head;

        while(fast != null && fast.next != null){
            fast = fast.next.next;
            slow = slow.next;
        }

        ListNode prev = reverse(slow);

        ListNode head1 = head, head2 = prev;
        while(head2 != null){
            mx = Math.max(mx, head1.val+head2.val);
            head1 = head1.next;
            head2 = head2.next;
        }
        return mx;
    }
}
