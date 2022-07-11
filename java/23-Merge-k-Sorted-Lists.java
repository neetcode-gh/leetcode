class Solution {

  public ListNode mergeKLists(ListNode[] lists) {
    Queue<Integer> minHeap = new PriorityQueue<>();

    for (ListNode nodes : lists) {
      ListNode current = nodes;
      while (current != null) {
        minHeap.add(current.val);
        current = current.next;
      }
    }

    ListNode dummy = new ListNode(0);
    ListNode current = dummy;

    while (!minHeap.isEmpty()) {
      current.next = new ListNode(minHeap.poll());
      current = current.next;
    }

    return dummy.next;
  }
}
