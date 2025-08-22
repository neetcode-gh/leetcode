function deleteNode(node: ListNode | null): void {
    node.val = node.next.val;
    node.next = node.next.next;
};
