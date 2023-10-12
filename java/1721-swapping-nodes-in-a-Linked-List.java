/*
    Author: Viet2307
    Github: https://github.com/viet2307
    Name - Swapping Nodes in a Linked List
    Link - https://leetcode.com/problems/swapping-nodes-in-a-linked-list/description/
    Time Complexity O(N)
    Space Complexity - O(1)
*/

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
    public ListNode swapNodes(ListNode head, int k) {
        int length = 1;
        ListNode tail = head;
        ListNode first = new ListNode(0);

        // find out the tail node and length of LL
        while(tail != null && tail.next != null) {
            // we found the kth node from head
            if(length == k) first = tail;
            tail = tail.next;
            length++;
        }
        
        // if LL only has one node
        if(length == 1) return head;

        // if they want to swap the head and tail
        if(length == k) {
            int temp = head.val;
            head.val = tail.val;
            tail.val = temp;
            return head;
        }

        // find out where the last node needed to swap is located at
        // it's simple "maffs"
        ListNode last = head;
        int i = 1;
        while(last.next != null) {
            if(i == length-k+1) break;
            last = last.next;
            i++;
        }

        // swapping part
        int temp = first.val;
        first.val = last.val;
        last.val = temp;

        return head;
    }
}
