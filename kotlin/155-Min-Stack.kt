import kotlin.math.min

class MinStack() {
    private class Node(var `val`: Int, var min: Int, var next: Node?)

    private var head: Node? = null

    fun push(x: Int) {
        if(head==null) head = Node(x,x,null) else head = Node(x, min(x,head?.min!!),head)
    }

    fun pop() {
        head = head?.next

    }

    fun top(): Int? {
        return head?.`val`

    }

    fun getMin(): Int? {
        return head?.min

    }

}