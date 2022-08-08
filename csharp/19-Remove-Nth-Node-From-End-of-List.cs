/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode RemoveNthFromEnd(ListNode head, int n) {
        var dummy = new ListNode(0, head);
        var left = dummy;
        var right = head;
        
        while(n > 0) {
            right = right.next;
            n--;
        }
        
        while(right != null) {
            left = left.next;
            right = right.next;
        }
        
        // delete
        left.next = left.next.next;
        return dummy.next;
    }
}