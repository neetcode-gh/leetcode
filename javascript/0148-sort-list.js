function sortList(head) {
  if (!head || !head.next) return head;
  let [firstHalf, secondHalf] = splitList(head);
  firstHalf = sortList(firstHalf);
  secondHalf = sortList(secondHalf);
  return mergeTwoSortedLists(firstHalf, secondHalf);
}

function splitList(head) {
  if (!head || !head.next) return [head, null];
  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let firstHalf = head;
  let secondHalf = slow.next;
  slow.next = null;
  return [firstHalf, secondHalf];
}

function mergeTwoSortedLists(l, r) {
  let head = new ListNode();
  let node = head;
  while (l && r) {
    if (l.val > r.val) {
      node.next = new ListNode(r.val)
      r = r.next
    }
    else {
      node.next = new ListNode(l.val)
      l = l.next
    }
    node = node?.next
  }
  if (!l && node) node.next = r;
  if (!r && node) node.next = l;
  return head.next
}
