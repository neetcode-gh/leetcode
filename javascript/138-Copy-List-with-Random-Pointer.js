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

  ptr = head;
  while (ptr) {
    map.get(ptr).next = map.get(ptr.next) || null;
    map.get(ptr).random = map.get(ptr.random) || null;
    ptr = ptr.next;
  }
  return map.get(head);
};
