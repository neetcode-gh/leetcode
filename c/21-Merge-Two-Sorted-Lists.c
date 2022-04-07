/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) {
    if (l1 == NULL && l2 == NULL)
        return NULL;
    if (l1 == NULL && l2 != NULL)
        return (l2);
    if (l2 == NULL && l1 != NULL)
        return (l1);
    struct ListNode *l3 = l1;
    struct ListNode *result = l3;
    for (struct ListNode *i = l1; i->next != NULL; i = i->next) {
        l3 = i;
        l3 = l3->next;
    }
    l3->next = l2;
    for (struct ListNode *j = l2; j->next != NULL; j = j->next) {
        l3->next = j;
        l3 = l3->next;
    }
    /* commit : for debug
    for (int nb_wag = 1; result != NULL; result = result->next, nb_wag++) {
        printf("val : %d -> nb : %d\n", result->val ,nb_wag);
    }*/
    struct ListNode *i, *j;
    int temp = 0;
    for (i = result; i->next != NULL; i = i->next) {
        for (j = i->next; j != NULL; j = j->next) {
            if (i->val >= j->val) {
                temp = i->val;
                i->val = j->val;
                j->val = temp;
            }
        }
    }
    return (result);
}
