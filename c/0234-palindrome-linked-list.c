/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
bool isPalindrome(struct ListNode* head){

    // find middle of linked list
    struct ListNode *slow = head, *fast = head;
    while (fast && fast->next){
        slow = slow->next;
        fast = fast->next->next;
    }
    // reverse second half
    struct ListNode* prev = NULL;
    while (slow){
        struct ListNode* nxt = slow->next;
        slow->next = prev;
        prev = slow;
        slow = nxt;
    }

    // compare left and right
    struct ListNode *left=head, *right=prev;
    while (right){
        if (left->val != right->val){
            return false;
        }
        left = left->next;
        right = right->next;
    }
    return true;
    
}
