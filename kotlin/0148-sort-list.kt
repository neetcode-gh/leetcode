class Solution {
    fun sortList(head: ListNode?): ListNode? {

        fun mid(root: ListNode?): ListNode? {
            var slow = head
            var fast = head
            var prev: ListNode? = null
            while (fast != null && fast?.next != null) {
                prev = slow
                slow = slow?.next
                fast = fast?.next?.next
            }
            prev?.next = null
            return slow
        }

        fun merge(_l1: ListNode?, _l2: ListNode?): ListNode? {
            var l1 = _l1
            var l2 = _l2
            var dummy = ListNode()
            var tail = dummy

            while (l1 != null && l2 != null) {
                if (l1.value < l2.value) {
                    tail.next = l1
                    l1 = l1?.next
                } else {
                    tail.next = l2
                    l2 = l2?.next
                }
                tail = tail?.next
            }

            if (l1 != null) tail.next = l1
            if (l2 != null) tail.next = l2

            return dummy.next
        }

        if (head == null || head.next == null)
            return head

        val mid = mid(head)
        val sortLeft = sortList(head)
        val sortRight = sortList(mid)

        return merge(sortLeft, sortRight)
    }

    val ListNode.value 
        get() = this.`val`
}
