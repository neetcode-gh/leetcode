/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // find mid point
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // reverse 2nd half
    let curr = slow;
    let prev = null;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    let head2 = prev;
    
    // compare both halfs
    while (head && head2) {
        if (head.val !== head2.val) {
            return false;
        }
        
        head = head.next;
        head2 = head2.next;
    }
    
    return true;
};
