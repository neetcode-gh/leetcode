/*----------------------------
  Time Complexity : O(n)
  Space Complexity : O(1)
----------------------------*/  
class Solution {
    public ListNode swapNodes(ListNode head, int k) {
        ListNode cur = head;
        for(int i = 0; i < k-1; i++) 
            cur = cur.next;

        ListNode left = cur;
        ListNode right = head;
        while(cur.next != null) {
            cur = cur.next;
            right = right.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

        return head;
    }
}
