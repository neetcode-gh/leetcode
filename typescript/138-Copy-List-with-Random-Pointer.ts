/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     random: Node | null
 *     constructor(val?: number, next?: Node, random?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */

function copyRandomList(head: Node | null): Node | null {
  const oldToNew = new Map<Node, Node>();

  let cur = head;
  while (cur) {
    let copy = new Node(cur.val);
    oldToNew.set(cur, copy);
    cur = cur.next;
  }

  for (const [oldptr, newptr] of oldToNew) {
    newptr.next = oldptr.next && oldToNew.get(oldptr.next);
    newptr.random = oldptr.random && oldToNew.get(oldptr.random);
  }

  return oldToNew.get(head)!;
}
