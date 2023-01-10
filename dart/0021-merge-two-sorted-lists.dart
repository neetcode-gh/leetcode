/**
 * Definition for singly-linked list.
 * class ListNode {
 *   int val;
 *   ListNode? next;
 *   ListNode([this.val = 0, this.next]);
 * }
 */
class Solution {
  ListNode? mergeTwoLists(ListNode? list1, ListNode? list2) {
      ListNode? head = ListNode();
      ListNode? cur = head;
      while (list1 != null && list2 != null) {
          if (list1!.val < list2!.val) {
              cur!.next = list1;
              list1 = list1!.next;
          } else {
              cur!.next = list2;
              list2 = list2!.next;
          }
          cur = cur!.next;
      }
      cur!.next = (list1 == null) ? list2 : list1;
      return head.next;
  }
}