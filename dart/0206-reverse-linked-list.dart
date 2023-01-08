// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {
  ListNode? reverseList(ListNode? head) {
    if (head == null) return null;

    ListNode? newHead;

    while (head != null) {
      if (newHead == null) {
        newHead = head;
        head = head.next;
        newHead.next = null;
      } else {
        var temp = newHead;
        newHead = head;
        head = head.next;
        newHead.next = temp;
      }
    }

    return newHead;
  }
}
