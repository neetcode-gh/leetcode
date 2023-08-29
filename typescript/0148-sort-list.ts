function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let [firstHalf, secondHalf]: (ListNode | null)[] = splitList(head);
  firstHalf = sortList(firstHalf);
  secondHalf = sortList(secondHalf);
  return mergeTwoSortedLists(firstHalf, secondHalf);
}

function splitList(head: ListNode | null): (ListNode | null)[] {
  if (!head || !head.next) return [head, null];
  let slow: ListNode | null = head;
  let fast: ListNode | null = head.next;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next!;
  }
  let firstHalf: ListNode | null = head;
  let secondHalf: ListNode | null = slow.next;
  slow.next = null;
  return [firstHalf, secondHalf];
}

function mergeTwoSortedLists(l: ListNode | null, r: ListNode | null): ListNode | null {
  let head: ListNode | null = new ListNode();
  let node: ListNode | null = head;
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
