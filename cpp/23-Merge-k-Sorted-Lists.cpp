class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // min heap based on ListNode->val
        auto cmpr = [](ListNode* a, ListNode* b) {return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmpr)> pq(cmpr);
        
        for (auto list : lists) {
            if (list != nullptr)
                pq.push(list);
        }

        ListNode* head = nullptr;
        ListNode* tail = nullptr;
        while (!pq.empty()) {
            // get the smallest node
            auto node = pq.top();
            pq.pop();
            // if the node is not the end of the list, push to pq
            if (node->next != nullptr)
                pq.push(node->next);
            if (head == nullptr) {
                // assign to head
                head = node;
                tail = node;
            }
            else {
                tail->next = node;
                tail = node;
            }
        }

        return head;
    }
};
