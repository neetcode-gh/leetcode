/*
    Given head of linked-list, reorder list alternating outside in
    Ex. head = [1,2,3,4] -> [1,4,2,3], head = [1,2,3,4,5] -> [1,5,2,4,3]

    Find middle node, split in half, reverse 2nd half of list, merge

    Time: O(n)
    Space: O(1)
*/

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
    void reorderList(ListNode* head) {
        if (head->next == NULL) {
            return;
        }
        
        ListNode* prev = NULL;
        ListNode* slow = head;
        ListNode* fast = head;
        
        while (fast != NULL && fast->next != NULL) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        
        prev->next = NULL;
        
        ListNode* l1 = head;
        ListNode* l2 = reverse(slow);
        
        merge(l1, l2);
    }
private:
    ListNode* reverse(ListNode* head) {
        ListNode* prev = NULL;
        ListNode* curr = head;
        ListNode* next = curr->next;
        
        while (curr != NULL) {
            next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        
        return prev;
    }
    void merge(ListNode* l1, ListNode* l2) {
        while (l1 != NULL) {
            ListNode* p1 = l1->next;
            ListNode* p2 = l2->next;
            
            l1->next = l2;
            if (p1 == NULL) {
                break;
            }
            l2->next = p1;
            
            l1 = p1;
            l2 = p2;
        }
    }
};
