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

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let dummy = new ListNode(0, head);
    let groupPrev = dummy;
    
    while (true) {
        let kth = getKth(groupPrev, k);
        if (!kth) {
            break;
        }
        
        let groupNext = kth.next;
        
        // reverse group
        let prev = kth.next;
        let curr = groupPrev.next;
        
        while (curr !== groupNext) {
            let temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        
        let temp = groupPrev.next;
        groupPrev.next = kth;
        groupPrev = temp;
    }
    
    return dummy.next;
};

function getKth(curr: ListNode | null, k: number): ListNode | null  {
    while (curr && k > 0) {
        curr = curr.next;
        k -= 1;
    }

    return curr;
}