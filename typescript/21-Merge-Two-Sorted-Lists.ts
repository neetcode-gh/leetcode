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

function mergeTwoLists(
    list1: ListNode | null,
    list2: ListNode | null
): ListNode | null {
    let dummyList: ListNode = new ListNode(0);
    let currentNode: ListNode = dummyList;

    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            currentNode.next = list1;
            list1 = list1.next;
        } else {
            currentNode.next = list2;
            list2 = list2.next;
        }

        currentNode = currentNode.next;
    }

    if (list1 !== null) currentNode.next = list1;
    if (list2 !== null) currentNode.next = list2;

    return dummyList.next;
}
