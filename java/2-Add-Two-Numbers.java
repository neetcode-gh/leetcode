/*
    Name - Add Two Numbers
    Link - https://leetcode.com/problems/add-two-numbers/
    Time Complexity - O(m + n)
    Space Complexity - o(1)
    Note - make use of modulo (get remainder) and division (get quotient)
*/

class Solution {

    public ListNode addTwoNumbers(ListNode first, ListNode second) {
        int q = 0;
        int r = 0;
        int sum = 0;
        ListNode head = null;
        ListNode temp = null;
        while (first != null || second != null) {
            sum =
                q +
                (
                    ((first != null) ? first.val : 0) +
                    ((second != null) ? second.val : 0)
                );
            r = sum % 10;
            q = sum / 10;
            ListNode newNode = new ListNode(r);
            if (head == null) {
                head = newNode;
            } else {
                temp = head;
                while (temp.next != null) {
                    temp = temp.next;
                }
                temp.next = newNode;
                newNode.next = null;
            }
            if (first != null) {
                first = first.next;
            }
            if (second != null) {
                second = second.next;
            }
        }
        if (q > 0) {
            ListNode newNode = new ListNode(q);
            temp = head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = newNode;
            newNode.next = null;
        }
        return head;
    }
}
