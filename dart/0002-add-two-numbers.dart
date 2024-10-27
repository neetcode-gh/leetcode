/**
 * Definition for singly-linked list.
 * class ListNode {
 *   int val;
 *   ListNode? next;
 *   ListNode([this.val = 0, this.next]);
 * }
 */
class Solution {
  ListNode? addTwoNumbers(ListNode? l1, ListNode? l2) {
    ListNode ?listnode;
    int carry = 0;
    while (l1 != null || l2 != null) {
        int val = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
        l1 = l1?.next;
        l2 = l2?.next;
        if (val > 9){
            val = val - 10;
            carry = 1;
        } else {
            carry = 0;
        }

      if (listnode != null)
        listnode = ListNode(val, listnode);

    else
     listnode = ListNode(val);
    }
    if (carry != 0){
        listnode = ListNode(carry, listnode);
    }
    var list;
    while (listnode != null) {
        list = ListNode(listnode.val, list);;
        listnode = listnode?.next;
    }
      return list;
  }

}
