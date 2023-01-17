/**
 * Given the head of a linked list, return the node where the cycle begins. If
 * there is no cycle, return null.
 *
 * There is a cycle in a linked list if there is some node in the list that can
 * be reached again by continuously following the next pointer. Internally, pos
 * is used to denote the index of the node that tail's next pointer is connected
 * to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as
 * a parameter.
 *
 * Do not modify the linked list.
 *
 * Constraints:
 *
 * The number of the nodes in the list is in the range [0, 104].
 * -105 <= Node.val <= 105
 * pos is -1 or a valid index in the linked-list.
 *
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 *
 * Space: O(1)
 * Time: O(n)
 */

struct ListNode *detectCycle(struct ListNode *head) {
    struct ListNode *fast = head;
    struct ListNode *slow = head;

    if (!head)
        return NULL;

    while (fast->next && fast->next->next) {
        fast = fast->next->next;
        slow = slow->next;

        if (fast == slow) {
            /**
             * The index of the node cycle is located the same number of nodes
             * away from the start of the linked list and the intersection of
             * the slow and fast pointers.
             */
            struct ListNode *head_node = head;
            struct ListNode *intersection = slow;

            while (head_node != intersection) {
                head_node = head_node->next;
                intersection = intersection->next;
            }

            return intersection;
        }
    }

    return NULL;
}
