/*
    Given two linked lists where the nodes represent the digits of two numbers,
    add the numbers together and return the sum as a linked list.
    Ex. l1 = [2,4,3], 
        l2 = [5,6,4] -> [7,0,8]

    Traverse the linked lists and add the values of the corresponding nodes, if
    the sum is greater than 10, carry is present and will be added along with 
    the next pair of digits. The lengths of the lists may differ, so check if 
    the nodes are not null, before adding.

    Time: O(max(m, n))  where m, n are lengths of l1 and l2 respectively
    Space: O(max(m, n))
*/

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* newNode(int val) {
    struct ListNode* node = (struct ListNode*) malloc(sizeof(struct ListNode));
    node->val = val;
    node->next = NULL;
        
    return node;
}

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2){
    struct ListNode* head = NULL;
    struct ListNode* curr = NULL;

    int carry = 0;

    while (l1 || l2) {
        int sum = carry;

        if (l1)
            sum += l1->val;
        if (l2)
            sum += l2->val;

        carry = sum/10;
        sum %= 10;

        if (head == NULL) {
            head = newNode(sum);
            curr = head;
        } else {
            curr->next = newNode(sum);
            curr = curr->next;
        }

        if (l1)
            l1 = l1->next;
        if (l2)
            l2 = l2->next;
    }

    if (carry) 
        curr->next = newNode(carry);
        

    return head;
}
