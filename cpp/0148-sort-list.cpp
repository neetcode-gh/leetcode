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
private:
    // find middle of LL using slow and fast pointers
    ListNode* findLLMid(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head->next;
        while (fast != NULL && fast->next != NULL) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }

    // merges two sorted LLs
    ListNode* merge(ListNode* head1, ListNode* head2) {
        ListNode* dummy = new ListNode();
        ListNode* p = dummy;
        ListNode* p1 = head1;
        ListNode* p2 = head2;

        while (p1 != NULL && p2 != NULL) {
            if (p1->val < p2->val) {
                ListNode* temp = p1->next;
                p->next = p1;
                p1->next = NULL;
                p1 = temp;
            } else {
                ListNode* temp = p2->next;
                p->next = p2;
                p2->next = NULL;
                p2 = temp;
            }
            p = p->next;
        }

        if (p1 == NULL) {
            p->next = p2;
        } else if (p2 == NULL) {
            p->next = p1;
        }

        return dummy->next;
    }
public:
    // merge sort implementation
    ListNode* sortList(ListNode* head) {
        // base cases
        if (head == NULL)
            return NULL;
        if (head->next == NULL) 
            return head;
        
        // split LL into two halves
        ListNode* middleOfLL = findLLMid(head);
        ListNode* leftHalf = head;
        ListNode* rightHalf = middleOfLL->next;
        middleOfLL->next = NULL; // this cuts off the right half from the left half

        // sort the two halves seperately and then merge them into one 
        leftHalf = sortList(leftHalf); 
        rightHalf = sortList(rightHalf);
        head = merge(leftHalf, rightHalf);

        return head;
    }
};