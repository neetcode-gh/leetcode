/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeElements(head: ListNode | null, val: number): ListNode | null {
    
    let sentinel_node : ListNode = new ListNode(0, head);
    let slow_pointer  : ListNode | null = sentinel_node;
    let fast_pointer  : ListNode | null = null;

    while (slow_pointer) {
                        
        // get next legible node
        fast_pointer = slow_pointer.next;
        while (fast_pointer && fast_pointer.val === val) {
            fast_pointer = fast_pointer.next;
        }

        // Set next node to the legible node
        slow_pointer.next = fast_pointer;
        slow_pointer      = slow_pointer.next;
    }

    return sentinel_node.next;
};