/*
    Name - Remove Nodes From Linked List
    Link - https://leetcode.com/problems/remove-nodes-from-linked-list/
    Time Complexity - O(n)
    Space Complexity - O(n)
    Note - Usage of Stack<E>
*/

class Solution {
    public ListNode removeNodes(ListNode head) {

        Stack<ListNode> stack = new Stack<ListNode>();
        ListNode curr = head;
        while (curr != null)
        {
            int value = curr.val;
            while (!stack.empty() && stack.peek().val < curr.val)
                stack.pop();
            stack.push(curr);
            curr = curr.next;
        }
        ListNode temp = null;
        while (!stack.isEmpty())
        {
            curr = stack.pop();
            curr.next = temp;
            temp = curr;
        }
        return curr;
    }
}