//Three pointer approach that we use in in-place reversal of linked list.

class Solution {

  public ListNode deleteDuplicates(ListNode head) {
    ListNode p = null;
    ListNode q = null;
    ListNode r = head;
    while (r != null) {
      if (q != null && q.val == r.val) {
        r = r.next;
        q.next = r;
      } else {
        p = q;
        q = r;
        r = r.next;
      }
    }
    return head;
  }
}
