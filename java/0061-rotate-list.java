//TC: O(n) + O(n- (n % k)) ~ O(n)
//SC: O(1)

class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0)
            return head;

        int l = 1; // length of list
        ListNode temp = head;

        // calculate the list's length
        while (temp.next != null) {
            l++;
            temp = temp.next;
        }

        temp.next = head; // make the list cyclic
        k = k % l; // handles the case where k>l
        k = l - k;

        while (k > 0) {
            temp = temp.next;
            k--;
        }
        head = temp.next;
        temp.next = null;

        return head;
    }
}