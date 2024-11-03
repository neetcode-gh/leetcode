/*
  Given a linked list, swap every two adjacent nodes and return its head. 
  You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

  Ex. Input: head = [1,2,3,4]
      Output: [2,1,4,3]

  Time  : O(N);
  Space : O(1);
*/

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {  
        if (!head || !head->next) 
            return head;

        ListNode *new_head = head->next;
        ListNode *prev = NULL;

        while (head && head->next) {
            ListNode *next_pair = head->next->next;
            ListNode *second = head->next;

            if (prev)
                prev->next = second;

            second->next = head;
            head->next = next_pair;

            prev = head;
            head = next_pair;
        }
        return new_head;
    }
};
