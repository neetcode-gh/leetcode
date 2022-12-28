package kotlin

class ListNode(var `val`: Int) {
    var next: ListNode? = null
}

class Solution {
    fun removeNthFromEnd(head: ListNode?, n: Int): ListNode? {
        var fastPointer = head
        var slowPointer: ListNode? = null
        var i = 1
        while (fastPointer != null && i <= n) {
            fastPointer = fastPointer.next
            i++
        }
        while (fastPointer != null) {
            slowPointer = if (slowPointer == null) head else slowPointer.next
            fastPointer = fastPointer.next
        }
        slowPointer?.next = slowPointer?.next?.next
        return if (slowPointer == null) head?.next else head
    }
}