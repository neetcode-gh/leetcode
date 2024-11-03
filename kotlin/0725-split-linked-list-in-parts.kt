class Solution {
    fun splitListToParts(head: ListNode?, k: Int): Array<ListNode?> {
        var n = 0
        var cur = head
        while (cur != null) {
            cur = cur?.next
            n++
        }

        val len = n / k
        var rem = n % k

        cur = head
        val res = arrayOfNulls<ListNode?>(k)
        for (i in 0 until k) {
            res[i] = cur

            val end = (len - 1) + if (rem > 0) 1 else 0
            for (j in 0 until end) {
                cur?: break
                cur = cur?.next
            }

            if (rem > 0) rem--
            if (cur != null) {
                val temp = cur?.next
                cur.next = null
                cur = temp
            }
        }

        return res
    }
}
