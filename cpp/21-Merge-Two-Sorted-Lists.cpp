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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* res = new ListNode(0);
        auto ptr = res;
        
        auto ptr1 = list1;
        auto ptr2 = list2;
        
        while (ptr1 && ptr2) {
            if (ptr1->val < ptr2->val) {
                res->next = ptr1;
                ptr1 = ptr1->next;
                res = res->next;
            }
            else {
                res->next = ptr2;
                ptr2 = ptr2->next;
                res = res->next;
            }
        }
        
        while (ptr1) {
            res->next = ptr1;
            res = res->next;
            ptr1 = ptr1->next;
        }
        while (ptr2) {
            res->next = ptr2;
            res = res->next;
            ptr2 = ptr2->next;
        }
        
        return ptr->next;
    }
};