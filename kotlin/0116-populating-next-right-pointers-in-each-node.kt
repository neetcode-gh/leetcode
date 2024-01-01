// Time complexity O(n) and space complexity O(1) with Follow-up constraints, without using recursion
class Solution {
    fun connect(root: Node?): Node? {
        var cur = root
        var next = cur?.left

        while (cur != null && next != null) {
            cur?.left?.next = cur?.right
            if (cur?.next != null)
                cur?.right?.next = cur?.next?.left

            cur = cur?.next
            if (cur == null) {
                cur = next
                next = cur?.left
            }
        }
        
        return root
    }
}

// Time complexity O(n) and space complexity O(1) with Follow-up constraints using recursion
class Solution {
    fun connect(root: Node?): Node? {
        root?: return null

        root.left?.let {
            it.next = root.right
            root.right?.let {
                it.next = root.next?.left
            }
            connect(root.left)
            connect(root.right)
        }

        return root
    }
}

// Time complexity O(n) and space complexity O(logn)
class Solution {
    fun connect(root: Node?): Node? {
        with (LinkedList<Pair<Node?, Int>>()) {
            addLast(root to 0)

            while (isNotEmpty()) {
                repeat (size) {
                    val (curNode, curLevel) = removeFirst()
                    peekFirst()?.let { (nextNode, nextLevel) ->
                        if (nextLevel == curLevel)
                            curNode?.next = nextNode
                    }
                    curNode?.left?.let { addLast(it to (curLevel + 1)) }
                    curNode?.right?.let { addLast(it to (curLevel + 1)) }
                }
            }
        }

        return root
    }
}
