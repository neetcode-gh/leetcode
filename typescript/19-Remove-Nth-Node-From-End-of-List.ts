/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let dummy: ListNode = new ListNode(0, head);
  let left = dummy;
  let right = head;

  while (n > 0) {
    right = right.next;
    n -= 1;
  }

  while (right) {
    left = left.next;
    right = right.next;
  }

  // delete
  left.next = left.next.next;
  return dummy.next;
}
