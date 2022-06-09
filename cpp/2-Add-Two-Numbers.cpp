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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int carry = 0;
        ListNode *dummy = new ListNode();
        ListNode *ans = dummy;
        
        while(l1 || l2 || carry){
            int sum = 0;
            if(l1)  sum += l1->val, l1 = l1->next;
            if(l2)  sum += l2->val, l2 = l2->next;
            ListNode *tmp = new ListNode((sum+carry)%10);
            dummy->next = tmp;
            carry = (sum+carry)/10;
            dummy = dummy->next;
        }
        return ans->next;
    }
};