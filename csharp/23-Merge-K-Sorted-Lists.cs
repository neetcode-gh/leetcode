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
    public ListNode MergeKLists(ListNode[] lists) {
        if (lists.Length == 0)
        {
            return null;
        }
        
        while (lists.Length > 1)
        {
            var mergedLists = new ListNode[(lists.Length + 1) / 2];
            for (int i = 0; i < lists.Length; i += 2)
            {
                var l1 = lists[i];
                var l2 = (i + 1 < lists.Length) ? lists[i + 1] : null;
                mergedLists[i/2] = (MergeLists(l1, l2));
            }
            lists = mergedLists;
        }
        
        return lists[0];
    }
    
    public ListNode MergeLists(ListNode l1, ListNode l2)
    {
        var sorted = new ListNode();
        var current = sorted;
        
        while (l1 != null && l2 != null)
        {
            if (l1.val <= l2.val)
            {
                current.next = l1;
                l1 = l1.next;
            }
            else
            {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        if (l1 != null)
        {
            current.next = l1;
        } else 
        {
            current.next = l2;
        }
        
        return sorted.next;
    }
}
