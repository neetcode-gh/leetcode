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
    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {
        var sumList = new ListNode();
        var current = sumList;
        int carry = 0, sum = 0;
        
        while (l1 != null || l2 != null || carry == 1)
        {
            var v1 = l1 == null ? 0 : l1.val;
            var v2 = l2 == null ? 0 : l2.val;
            sum = v1 + v2 + carry;
            carry = sum > 9 ? 1 : 0;
            sum = sum % 10;
            current.next = new ListNode(sum);
            
            current = current.next;
            l1 = l1 == null ? null : l1.next;
            l2 = l2 == null ? null : l2.next;
        }
        
        return sumList.next;
    }
}
