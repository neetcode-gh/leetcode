/**
 https://leetcode.com/problems/remove-linked-list-elements/
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    let prev = null;
    let cur = head;
    while (cur) {
        if (cur.val === val) {
            if (prev) {
                prev.next = prev.next.next;
            } else {
                head = head.next;
            }
        } else {
            prev = cur;
        }
        cur = cur.next;
    }
    return head;
};
