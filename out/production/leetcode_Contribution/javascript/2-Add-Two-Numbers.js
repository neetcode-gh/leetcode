/**
 * https://leetcode.com/problems/add-two-numbers/
 * Time O(MAX(N, M)) | Space O(MAX(N, M))
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let sentinel = tail = new ListNode();

    return add(l1, l2, tail, sentinel);       /* Time O(MAX(N, M)) | Space O(MAX(N, M)) */
}

const add = (l1, l2, tail, sentinel, carry = 0) => {
    const isBaseCase = !(l1 || l2 || carry);
    if (isBaseCase) return sentinel.next;

    return dfs(l1, l2, tail, sentinel, carry);/* Time O(MAX(N, M)) | Space O(MAX(N, M)) */
}

const dfs = (l1, l2, tail, sentinel, carry) => {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    const val = sum % 10;
    carry = Math.floor(sum / 10);

    tail.next = new ListNode(val);
    tail = tail.next;

    l1 = l1?.next || null;
    l2 = l2?.next || null;

    add(l1, l2, tail, sentinel, carry);     /* Time O(MAX(N, M)) | Space O(MAX(N, M)) */

    return sentinel.next;
}

/**
 * https://leetcode.com/problems/add-two-numbers/
 * Time O(MAX(N, M)) | Space O(MAX(N, M))
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2, carry = 0) {
    let sentinel = tail = new ListNode();

    while (l1 || l2 || carry) {/* Time O(MAX(N, M)) */
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        const val = sum % 10;
        carry = Math.floor(sum / 10);

        tail.next = new ListNode(val);
        tail = tail.next;

        l1 = l1?.next || null;
        l2 = l2?.next || null;
    }

    return sentinel.next;
};
