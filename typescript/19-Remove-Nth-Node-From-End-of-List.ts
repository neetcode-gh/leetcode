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
  let dummyList: ListNode = new ListNode(0)
  dummyList.next = head
  let count: number = 0
  let first: ListNode = dummyList
  let second: ListNode = dummyList

  while (count < n) {
    second = second.next
    count++
  }
  if (second === null) {
    dummyList.val = dummyList.next.val
    dummyList.next = dummyList.next.next
  }
  while (second.next !== null) {
    second = second.next
    first = first.next
  }
  first.next = first.next.next

  return dummyList.next
}
