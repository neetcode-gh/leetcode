/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
  public ListNode reverseBetween(ListNode head, int left, int right) {

    if (head == null || head.next == null) {
      return head;
    }

    if (left > right || left == right) {
      return head;
    }

    ListNode l = head;
    ListNode prevL = null;
    ListNode r = head;
    ListNode nextR = null;
    int posL = 1;
    int posR = 1;

    while (posL != left) {
      prevL = l;
      l = l.next;
      posL++;
    }

    while (posR != right) {
      r = r.next;
      posR++;
    }

    nextR = r.next;
    r.next = null;
    ListNode node = reverseList(l);
    node.next = nextR;
    if (prevL == null) {
      head = r;
    } else {
      prevL.next = r;
    }
    return head;
  }

  public ListNode reverseList(ListNode l) {
    if (l.next == null) {
      return l;
    }
    ListNode newNode = reverseList(l.next);
    newNode.next = l;
    l.next = null;
    return l;
  }
}
