public class Solution 
{
    public ListNode RemoveElements(ListNode head, int val) 
    {
        ListNode dummy = new ListNode(0, head);
        ListNode current = dummy;

        while (current.next is not null)
        {
            if (current.next.val == val)
            {
                current.next = current.next.next;
            }
            else
            {
                current = current.next;
            }
        }
        return dummy.next;
    }
}