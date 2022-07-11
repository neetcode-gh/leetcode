/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let currNode = head;
  let nodeBeforeN = head;

  for (let i = 0; i < n; i++) {
    currNode = currNode.next;
  }

  if (!currNode) {
    return head.next;
  }

  while (currNode.next) {
    nodeBeforeN = nodeBeforeN.next;
    currNode = currNode.next;
  }

  nodeBeforeN.next = nodeBeforeN.next.next;

  return head;
};
