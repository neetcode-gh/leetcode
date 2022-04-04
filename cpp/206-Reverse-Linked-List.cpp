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
    ListNode* reverseList(ListNode* head) {
        ListNode* rev = new ListNode(0);
        ListNode* ptr = head;
        
        while(ptr) {
            auto temp = ptr;
            ptr=ptr->next;
            temp-> next = rev->next;
            rev->next = temp;
        }
        
        return rev->next;
    }
};