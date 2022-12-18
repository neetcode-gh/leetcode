/**
 * https://leetcode.com/problems/merge-two-sorted-lists/
 * Time O(N) | Space O(N)
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
    const sentinel = new ListNode();

    sentinel.next = head;

    const fast = moveFast(sentinel, n);   /* Time O(N) */
    const slow = moveSlow(sentinel, fast);/* Time O(N) */

    slow.next = slow.next.next || null;

    return sentinel.next;
};

const moveFast = (fast, n) => {
    for (let i = 1; i <= (n + 1); i++) {/* Time O(N) */
        fast = fast.next;
    }

    return fast;
}

const moveSlow = (slow, fast) => {
    while (fast) {                     /* Time O(N) */
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}

/**
 * https://leetcode.com/problems/merge-two-sorted-lists/
 * Time O(N) | Space O(1)
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
    const length = getNthFromEnd(head, n);/* Time O(N) */

    const isHead = length < 0;
    if (isHead) return head.next;

    const curr = moveNode(head, length);  /* Time O(N) */

    curr.next = curr.next.next;

    return head
};

const getNthFromEnd = (curr, n, length = 0) => {
    while (curr) {                       /* Time O(N) */
        curr = curr.next;
        length++;
    }

    return (length - n) - 1;
}

const moveNode = (curr, length) => {
    while (length) {                    /* Time O(N) */
        curr = curr.next;
        length--;
    }

    return curr;
}
