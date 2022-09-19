/**
 * https://leetcode.com/problems/copy-list-with-random-pointer/
 * Time O(N) | Space O(N)
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head, map = new Map()) {
    if (!head) return null;
    if (map.has(head)) return map.get(head);

    const clone = new Node(head.val);

    map.set(head, clone);                           /*           | Space O(N) */
    clone.next = copyRandomList(head.next, map);    /* Time O(N) | Space O(N) */
    clone.random = copyRandomList(head.random, map);/* Time O(N) | Space O(N) */

    return clone;
}

/**
 * https://leetcode.com/problems/copy-list-with-random-pointer/
 * Time O(N) | Space O(1)
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (!head) return null;

    cloneNode(head);         /* Time O(N) */
    connectRandomNode(head); /* Time O(N) */

    return connectNode(head);/* Time O(N) */
};

const cloneNode = (curr) => {
    while (curr) {          /* Time O(N) */
        const node = new Node(curr.val);

        node.next = curr.next;
        curr.next = node;
        curr = node.next;
    }

    return curr;
}

const connectRandomNode = (curr) => {
    while (curr) {         /* Time O(N) */
        curr.next.random = curr.random?.next || null;
        curr = curr.next.next;
    }
}

const connectNode = (head) => {
    let [ prev, curr, next ] = [ head, head.next, head.next ];

    while (prev) {        /* Time O(N) */
        prev.next = prev.next.next;
        curr.next = curr?.next?.next || null;
        prev = prev.next;
        curr = curr.next;
    }

    return next
}