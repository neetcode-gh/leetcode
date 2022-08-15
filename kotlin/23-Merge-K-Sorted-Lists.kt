class Solution {

	// Time Complexity: O(n*k) where n is the number of elements and k is the number of linkedlists.
	// Space Complexity: O(r) where r is the number of recursion which will be equal to two linked lists combined at max. 
    fun mergeKLists(lists: Array<ListNode?>): ListNode? {
	
		// First we add all root nodes to a queue.
		// Because we are using queues, once two lists are merged that will go to the end avoiding to re-calculate big lists again.
        val queue: Queue<ListNode> = ArrayDeque()
        for (node in lists) {
            node?.let { queue += it }
        }

		// Second: we iterate over the queue as long as there is more than one root node in there.
        while (queue.size > 1) {
            val first = queue.poll()
            val second = queue.poll()

			// Third: We try to merge both lists, if result is not null we add to the queue to be processed again.
            mergeLists(first, second)?.let { queue += it }
        }

		// Forth: We return the single node in the queue, or null if it is empty.
        return queue.poll()
    }

	// Recursive merge lists function to merge two lists into one.
    private fun mergeLists(l1: ListNode?, l2: ListNode?): ListNode? {
        return when {
            l1 == null -> l2
            l2 == null -> l1
            l1.`val` <= l2.`val` -> l1.apply { next = mergeLists(l1.next, l2) }
            l1.`val` > l2.`val` -> l2.apply { next = mergeLists(l1, l2.next) }
            else -> null
        }
    }
}