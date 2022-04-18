class Solution {
public:
    ListNode* getKth(ListNode* curr, int k) {
        while (curr != nullptr && k > 0) {
            curr = curr->next;
            --k;
        }
        return curr;
    }

    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode dummy(0, head);
        // save previous node of the group
        auto groupPrev = &dummy;
        while (true) {
            auto kth = getKth(groupPrev, k);
            if (kth == nullptr) // less than k remain
                break;
            // save next node of the group
            auto groupNext = kth->next;
            // reverse group [groupPrev->next to kth]
            auto prev = kth->next;
            auto curr = groupPrev->next;
            while (curr != groupNext) {
                auto tmp = curr->next;
                curr->next = prev;
                prev = curr;
                curr = tmp;
            }
            // now, kth is the first of the group, groupPrev->next is the last of the group
            auto tmp = groupPrev->next;
            groupPrev->next = kth;
            // previous node of the next group(which is the last of the current group)
            groupPrev = tmp;
        }
        return dummy.next;
    }
};
