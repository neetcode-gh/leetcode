/**
 * Given the head of a singly linked list, reverse the list, and return the
 * reversed list.
 *
 * Constraints:
 *
 * The number of nodes in the list is the range [0, 5000].
 * -5000 <= Node.val <= 5000
 *
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 *
 * Space: O(1)
 * Time: O(n)
 */

struct ListNode* reverseList(struct ListNode* head){
    struct ListNode *current = head;
    struct ListNode *next = NULL;
    struct ListNode *previous = NULL;

    while (current) {
        next = current->next;
        current->next = previous;
        previous = current;
        current = next;
    }

    return previous;
}
