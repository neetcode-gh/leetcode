//Iterative version
class Solution {

  public ListNode swapPairs(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode temp = dummy;
    while (temp.next != null && temp.next.next != null) {
      ListNode first = temp.next;
      ListNode second = temp.next.next;
      temp.next = second;
      first.next = second.next;
      second.next = first;
      temp = first;
    }
    return dummy.next;
  }
}

//Recursive version
class Solution {

  public ListNode swapPairs(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode p = head.next;
    head.next = swapPairs(head.next.next);
    p.next = head;
    return p;
  }
}
