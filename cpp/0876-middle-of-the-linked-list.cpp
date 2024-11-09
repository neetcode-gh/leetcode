/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */

class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        /*
        The slow and fast pointer algorithm is used to find the middle 
        of a linked list by iterating through the list with a slow 
        pointer that moves one step at a time and a fast pointer that
        moves two steps at a time. When the fast pointer reaches the 
        end of the list, the slow pointer will be at the midpoint of the list.
        */
        ListNode *slow_pointer = head, *fast_pointer = head;
        while (fast_pointer != NULL && fast_pointer->next != NULL) {
            slow_pointer = slow_pointer->next;
            fast_pointer = fast_pointer->next->next;
        }
        return slow_pointer;
    }
};
