/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun isPalindrome(head: ListNode?): Boolean {

        var slow = head
        var fast = head

        // find the middle
        while(fast != null && fast.next != null) {
            fast = fast?.next?.next
            slow = slow?.next
        }

        //reverse the right part of list (from middle to end)
        var prev: ListNode? = null
        while(slow != null) {
            val temp = slow?.next
            slow?.next = prev
            prev = slow
            slow = temp
        }

        //traverse both divided parts, left and right portion, to check if palindrome
        var left = head
        var right = prev
        while(right != null) {
            if(right?.`val` != left?.`val`) return false
            left = left?.next
            right = right?.next
        }

        return true
    }
}
