
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */


struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2){
    
    if (list1 == NULL && list2 == NULL) {
        return NULL;
    } else if (list1 != NULL && list2 == NULL) {
        return list1;
    } else if (list2 != NULL && list1 == NULL) {
        return list2;
    }

    struct ListNode* temp_node = NULL;

    if (list1 -> val < list2 -> val) {
        temp_node = list1;
        list1 = list1 -> next;
    } else {
        temp_node = list2;
        list2 = list2 -> next;
    }

    struct ListNode* root = temp_node;
    
    while((list1 != NULL) || (list2 != NULL)) {

        if ((list2 == NULL) || ((list1 != NULL) && (list1 -> val < list2 -> val))) {
            temp_node -> next = list1;
            list1 = list1 -> next;
        } else {
            temp_node -> next = list2;
            list2 = list2 -> next;
        }
        temp_node = temp_node -> next;
    }

    return root;
}