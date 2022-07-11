var merge = function (l1, l2) {
  let tempNode = new ListNode(0);
  let current = tempNode;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  if (l1) current.next = l1;
  if (l2) current.next = l2;

  return tempNode.next;
};

var mergeKLists = function (lists) {
  let root = lists[0];

  for (let i = 1; i < lists.length; i++) {
    root = merge(root, lists[i]);
  }
  return root || null;
};
