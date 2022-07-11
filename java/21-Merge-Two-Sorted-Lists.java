package java;

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

  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    final ListNode root = new ListNode();
    ListNode prev = root;
    while (list1 != null && list2 != null) {
      if (list1.val < list2.val) {
        prev.next = list1;
        list1 = list1.next;
      } else {
        prev.next = list2;
        list2 = list2.next;
      }
      prev = prev.next;
    }
    prev.next = list1 != null ? list1 : list2;
    return root.next;
  }
}

// Solution using Recursion
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

  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode head = new ListNode(0);

    if (list1 == null && list2 == null) return null;
    if (list1 == null) return list2;
    if (list2 == null) return list1;

    if (list1.val > list2.val) {
      head = list2;
      list2 = list2.next;
    } else {
      head = list1;
      list1 = list1.next;
    }
    head.next = mergeTwoLists(list1, list2);
    return head;
  }
}
