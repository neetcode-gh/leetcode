class Solution {
    fun mergeInBetween(list1: ListNode?, a: Int, b: Int, list2: ListNode?): ListNode? {
        var curr = list1
        var i = 0
        while (i < a - 1) {
            curr = curr?.next
            i++
        }

        var head = curr
        while (i <= b) {
            curr = curr?.next
            i++
        }
        head?.next = list2

        var list2 = list2
        while (list2?.next != null)
            list2 = list2?.next
        list2?.next = curr
        return list1
    }
}
