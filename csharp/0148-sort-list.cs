public class Solution 
{
    public ListNode SortList(ListNode head)
    {
        if (head is null || head.next is null) 
            return head;

        ListNode middle = GetMiddle(head);
        ListNode left = head;
        ListNode right = middle.next;
        middle.next = null;

        return Merge(SortList(left), SortList(right));
    }
    private ListNode GetMiddle(ListNode head)
    {
        ListNode slow = head;
        ListNode fast = head.next;
        while (fast != null && fast.next != null)
        {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
    private ListNode Merge(ListNode left, ListNode right)
    {
        var head = new ListNode();
        var tail = head;
        while (left is not null && right is not null)
        {
            if (left.val < right.val)
            {
                tail.next = left;
                left = left.next;
            }
            else
            {
                tail.next = right;
                right = right.next;
            }
            tail = tail.next;
        }

        tail.next = left is not null ? left : right!;

        return head.next;
    }
}