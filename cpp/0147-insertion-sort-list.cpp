/*
  Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.
  
  The steps of the insertion sort algorithm:
  
  1. Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.
  2. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.
  3. It repeats until no input elements remain.

  Ex. Input: head = [4,2,1,3]
      Output: [1,2,3,4]
  
  Time : O(N^2)
  Space: O(1)
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
    ListNode* insertionSortList(ListNode* head) {
        if(head == NULL || head -> next == NULL) {
            return head;
        }

        ListNode *ptr1 = head -> next, *sortedPtr = head;
        while(ptr1 != NULL) {
            if(ptr1 -> val < sortedPtr -> val) {
                ListNode *ptr2 = head, *lagPtr = head;
                while(true) {
                    if(ptr2 -> val > ptr1 -> val) {
                        if(ptr2 == head) {
                            sortedPtr -> next = ptr1 -> next;
                            ptr1 -> next = head;
                            head = ptr1;
                            ptr1 = sortedPtr -> next;
                            break;
                        }
                        else {
                            sortedPtr -> next = ptr1 -> next;
                            ptr1 -> next = ptr2;
                            lagPtr -> next = ptr1;
                            ptr1 = sortedPtr -> next;
                            break;
                        }
                    }
                    lagPtr = ptr2;
                    ptr2 = ptr2 -> next;
                }
                
            } else {
                sortedPtr = sortedPtr -> next;
                ptr1 = ptr1 -> next;
            }
        }

        return head;
    }
};
