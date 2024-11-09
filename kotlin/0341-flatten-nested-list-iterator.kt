// Flatten the list at creation/constructor time, and then iterate through the flattened list
class NestedIterator(nestedList: List<NestedInteger>) {
    val stack = LinkedList<Int>()

    init {
        dfs(nestedList)
        stack.reverse()
    }
    
    fun next() = stack.removeLast()   
    
    fun hasNext() = stack.isNotEmpty()

    private fun dfs(nested: List<NestedInteger>) {
        for (n in nested) {
            if (n.isInteger())
                stack.addLast(n.getInteger())
            else
                dfs(n.getList())
        }
    }
}

// Dynamically ("on-the-go") flatten the list while iterating
class NestedIterator(nestedList: List<NestedInteger>) {

    val stack = LinkedList<NestedInteger>()

    init {
        stack.addAll(nestedList.reversed())
    }
    
    fun next(): Int {
        return stack.removeLast().getInteger()
    }
    
    fun hasNext(): Boolean {
        while (stack.isNotEmpty() && !stack.peekLast().isInteger()) {
            stack.addAll(stack.removeLast().getList().reversed())
        }

        return stack.isNotEmpty()
    }
}
