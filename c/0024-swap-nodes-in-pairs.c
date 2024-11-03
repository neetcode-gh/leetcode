/*
  Given a linked list, swap every two adjacent nodes and return its head. 
  You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

  Ex. Input: head = [1,2,3,4]
      Output: [2,1,4,3]

  Time  : O(N)
  Space : O(1)
*/

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* swapPairs(struct ListNode* head) {
    if (head == NULL || head->next == NULL) 
        return head;

    struct ListNode *new_head = head->next;
    struct ListNode *prev = NULL;

    while (head != NULL && head->next != NULL) {
        struct ListNode *next_pair = head->next->next;
        struct ListNode *second = head->next;

        if (prev != NULL)
            prev->next = second;

        second->next = head;
        head->next = next_pair;

        prev = head;
        head = next_pair;
    }

    return new_head;
}
