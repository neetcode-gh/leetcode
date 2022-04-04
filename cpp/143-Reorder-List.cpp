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
  void reorderList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* slow = head;
    ListNode* fast = head;

    // set slow to middle node
    while (fast != nullptr && fast->next != nullptr) {
      prev = slow;
      slow = slow->next;
      fast = fast->next->next;
    }

    if (prev != nullptr) {
      prev->next = reverseList(slow);
      mergeTwoLists(head, prev->next);
    }
  }

 private:
  ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;

    while (curr != nullptr) {
      ListNode* next = curr->next;
      curr->next = prev;
      prev = curr;
      curr = next;
    }

    return prev;
  }

  // invariant: list2 length = [list1 length, list1 length + 1]
  ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummy;
    ListNode* prev = &dummy;

    ListNode* l1 = list1;
    ListNode* l2 = list2;

    while (l1 != list2) {
      takeNode(prev, l1);
      takeNode(prev, l2);
    }

    // handle odd number of nodes
    if (l2 != nullptr) {
      takeNode(prev, l2);
    }

    return dummy.next;
  }

  void takeNode(ListNode*& prev, ListNode*& curr) {
    prev->next = curr;
    prev = prev->next;
    curr = curr->next;
  }
};
