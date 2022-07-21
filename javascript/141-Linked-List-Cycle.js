/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    let set = new Set();
    while (head) {
        if (set.has(head)) {
            return true;
        } else {
            set.add(head);
            head = head.next;
        }
    }

    return false;
};
