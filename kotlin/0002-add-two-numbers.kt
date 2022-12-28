package kotlin

class Solution {
    fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
        var n1 = l1
        var n2 = l2
        var carry = 0
        var sum: Int
        val dummyNode = ListNode(-1)
        var resultantList = dummyNode
        while (n1 != null || n2 != null) {
            sum = (n1?.`val` ?: 0) + (n2?.`val` ?: 0) + carry
            carry = sum / 10
            resultantList.next = ListNode(sum % 10)
            resultantList = resultantList.next!!
            n1 = n1?.next
            n2 = n2?.next
        }
        if (carry != 0) resultantList.next = ListNode(carry)
        return dummyNode.next
    }
}