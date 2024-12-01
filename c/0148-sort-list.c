/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

struct ListNode* merge(struct ListNode *list1, struct ListNode *list2) {
    struct ListNode *head, *tail;

    if (!list1 || !list2) {
        if (!list1) {
            return list2;
        }
        return list1;
    }

    if (list1->val < list2->val) {
        head = list1;
        list1 = list1->next;
    } else {
        head = list2;
        list2 = list2->next;
    }
    tail = head;

    while (list1 && list2) {
        if (list1->val < list2->val) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }
        tail = tail->next;
    }

    if (list1) {
        tail->next = list1;
    }

    if (list2) {
        tail->next = list2;
    }

    return head;
}

// Split a linked list in two halfs:
struct ListNode* split(struct ListNode* head) {
    struct ListNode *slow = head, *fast = head, *prev = NULL;

    while (fast && fast->next) {
        prev = slow;
        slow = slow->next;
        fast = fast->next->next;
    }

    prev->next = NULL;
    return slow;
}

struct ListNode* sortList(struct ListNode *head) {
    if (!head || !head->next) {
        return head;
    }

    return merge(sortList(head), sortList(split(head)));
}
