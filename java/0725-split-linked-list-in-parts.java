class Solution {
    public ListNode[] splitListToParts(ListNode head, int k) {
        int numNodes = countNodes(head);
        ListNode[] ans = new ListNode[k];

        int remainder = numNodes % k;
        int base_len = numNodes / k;
        ListNode curr = head;

        for (int i = 0; i < k; i++) {
            ListNode dummy = new ListNode(0), currHead = dummy;
            for (int j = 0; j < base_len + (i < remainder ? 1 : 0); j++) {
                currHead = currHead.next = new ListNode(curr.val);
                if (curr != null) curr = curr.next;
            }
            ans[i] = dummy.next;
        }
        return ans;
    }

    private int countNodes(ListNode root) {
        int cnt = 0;
        while (root != null) {
            cnt++;
            root = root.next;
        }
        return cnt;
    }
}