package kotlin

class Solution{
    fun mergeKLists(lists: Array<ListNode?>): ListNode? {
        if (lists.isEmpty()) return null
        var mergeInterval = 1
        while (mergeInterval < lists.size) {
            for (i in 0..lists.lastIndex step mergeInterval * 2) {
                lists[i] = merge(lists[i], if (i + mergeInterval <= lists.lastIndex) lists[i + mergeInterval] else null)
            }
            mergeInterval *= 2
        }
        return lists[0]
    }

    private fun merge(l1: ListNode?, l2: ListNode?): ListNode? {
        val dummyNode = ListNode(-1)
        var currentNodeInList1 = l1
        var currentNodeInList2 = l2
        var currentNodeInResultantList:ListNode? = dummyNode

        while(currentNodeInList1!=null && currentNodeInList2!=null){
            if (currentNodeInList1.`val`>=currentNodeInList2.`val`){
                currentNodeInResultantList?.next = currentNodeInList2
                currentNodeInList2 = currentNodeInList2.next
            }else{
                currentNodeInResultantList?.next = currentNodeInList1
                currentNodeInList1 = currentNodeInList1.next
            }
            currentNodeInResultantList = currentNodeInResultantList?.next
        }

        currentNodeInResultantList?.next = when{
            currentNodeInList1!=null -> currentNodeInList1
            currentNodeInList2!=null -> currentNodeInList2
            else -> null
        }
        return dummyNode.next
    }
}
