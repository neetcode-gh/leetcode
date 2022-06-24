/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  let map = new Map();
  let ptr = head;

  while (ptr) {
    // map old - new
    map.set(ptr, new Node(ptr.val, null, null));
    ptr = ptr.next;
  }

  for (const [ oldptr, newptr ] of map) {
    newptr.next = oldptr.next && map.get(oldptr.next);
    newptr.random = oldptr.random && map.get(oldptr.random);
  }
  return map.get(head);
};
