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
  let runner = head;
  let c = 0;

  while (c != n && runner != null) {
    c++;
    runner = runner.next;
  }

  if (runner == null) {
    return head.next;
  }

  let tail = head;

  while (runner.next != null) {
    runner = runner.next;
    tail = tail.next;
  }

  tail.next = tail.next.next;

  return head;
}
