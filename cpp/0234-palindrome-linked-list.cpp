class Solution {
    // Reverse a linked-list, Time = O(n), Space = O(n)
    ListNode *reverseList(ListNode *head) {
        ListNode *curr{head}, *prev{nullptr}, *next{nullptr};
        while (curr) {
            next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }

        return prev;
    }

    // Get middle of linked-list, Time = O(n), Space = O(n)
    ListNode *middleNode(ListNode *head) {
        if (!head || !head->next) return head;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }

    public:
    bool isPalindrome(ListNode *head) {
        if (!head || !head->next) return true;
        ListNode *list1{head}, *list2{nullptr};
        list2 = reverseList(middleNode(head));
        while (list1 && list2) {
            if (list1->val != list2->val) return false;
            list1 = list1->next;
            list2 = list2->next;
        }
        return true;
    }
};
