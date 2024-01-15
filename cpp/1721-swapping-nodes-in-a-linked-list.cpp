/*
  You are given the head of a linked list, and an integer k.
  Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

  Ex. Input: head = [1,2,3,4,5], k = 2
      Output: [1,4,3,2,5]

  Time  : O(N)
  Space : O(1)
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
    ListNode* swapNodes(ListNode* head, int k) {
        ListNode *fast{head}, *slow{head}, *kthFront = NULL;
        while (--k) {
            fast = fast->next;
        }

        kthFront = fast;

        while (fast->next) {
            fast = fast->next;
            slow = slow->next;
        }
        swap(slow->val, kthFront->val);
        return head;
    }
};
