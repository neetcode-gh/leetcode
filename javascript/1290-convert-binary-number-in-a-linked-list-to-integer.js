/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function (head) {
    let value = 0; // initialize value to zero
    while (head) { // while loop will run till head becomes null
        value = (value << 1) | head.val; // used left shift operator (<<) and bitwise OR (|) operator returns a number from binary
        head = head.next; // next value of head
    }

    return value; // return the value
};