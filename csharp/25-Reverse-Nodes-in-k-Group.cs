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
public class Solution
{
    public ListNode ReverseKGroup(ListNode head, int k)
    {
        var dummy = new ListNode(0, head);
        var groupPrev = dummy;
        var groupNext = dummy;

        while (true)
        {
            var kth = getKth(groupPrev, k);
            if (kth == null)
                break;

            groupNext = kth.next;

            // reverse group
            var prev = kth.next;
            var curr = groupPrev.next;

            while (curr != groupNext)
            {
                var temp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = temp;
            }

            var tmp = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = tmp;
        }

        return dummy.next;
    }

    private ListNode getKth(ListNode curr, int k)
    {
        while (curr != null && k > 0)
        {
            curr = curr.next;
            k -= 1;
        }

        return curr;
    }
}