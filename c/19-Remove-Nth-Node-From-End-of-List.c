/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    if (head == NULL)
        return NULL;
    struct ListNode* result = head;
    int size = 1;
    for (struct ListNode* i = head; i->next != NULL; i = i->next)
        size++;
    for (int i = 1; i < size - n; i++)
        head = head->next;
    if (size > 2 && size != n)
        head->next = head->next->next;
    else if (size == n)
        result = head->next;
    else
        result->next = NULL;
    return (result);
}
