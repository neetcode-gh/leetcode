/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {

//         Using Two Pointer Approach:
//         Take a pointer second and put it at (n+1)th position from the beginning
//         Take pointer first and move it forward till second reaches Null
//         At that point we would have reached the nth from the End considering the Gap between the Two Pointers
//         Unlink or Skip that node

        if (head == null || head.next == null) return null;

        ListNode temp = new ListNode(0);
        temp.next = head;
        ListNode first = temp, second = temp;

        while (n > 0) {
            second = second.next;
            n--;
        }

        while (second.next != null) {
            second = second.next;
            first = first.next;
        }

        first.next = first.next.next;
        return temp.next;

    }
}

// Recursive Solution: https://leetcode.com/problems/remove-nth-node-from-end-of-list/discuss/572765/Java-100-recursive-solution
