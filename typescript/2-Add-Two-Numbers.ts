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

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let dummyNode: ListNode = new ListNode()
  let currentNode: ListNode = dummyNode
  let carry: number = 0

  while (l1 !== null || l2 !== null || carry !== 0) {
    const val1 = l1 !== null ? l1.val : 0
    const val2 = l2 !== null ? l2.val : 0

    const sum: number = val1 + val2 + carry
    const value: number = sum % 10
    const newLinkedList: ListNode = new ListNode(value)
    currentNode.next = newLinkedList
    currentNode = newLinkedList
    carry = Math.floor(sum / 10)

    l1 = l1 !== null ? l1.next : null
    l2 = l2 !== null ? l2.next : null
  }

  return dummyNode.next
}
