/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val  = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    
    let sentinel_node = new ListNode(0, head);
    let slow_pointer = sentinel_node;
    let fast_pointer = null;

    while (slow_pointer) {
        // get next legible node
        fast_pointer = slow_pointer.next;
        while (fast_pointer && fast_pointer.val === val) {
            fast_pointer = fast_pointer.next;
        }

        // Set next node to the legible node
        slow_pointer.next = fast_pointer;
        slow_pointer = slow_pointer.next;
    }

    return sentinel_node.next;
};
