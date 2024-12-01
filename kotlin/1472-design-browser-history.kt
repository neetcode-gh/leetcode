/*
* Using an ArrayList
*/
class BrowserHistory(homepage: String) {

    val history = ArrayList<String>()
    var size = 0
    var index = 0

    init {
        history.add(homepage)
        size = 1
    }

    fun visit(url: String) {
        if(history.size < index + 2)
            history.add(url)
        else
            history[index + 1] = url
        index++
        size = index + 1
    }

    fun back(steps: Int): String {
        index = maxOf(index - steps, 0)
        return history[index]
    }

    fun forward(steps: Int): String {
        index = minOf(index + steps, size - 1)
        return history[index]
    }
}

/*
* Using a Doubly-LinkedList
*/
class BrowserNode(val page: String) {
    var next: BrowserNode? = null
    var prev: BrowserNode? = null
}

class BrowserHistory(homepage: String) {

    var current: BrowserNode? = null

    init {
        current = BrowserNode(homepage)
    }

    fun visit(url: String) {
        val temp = BrowserNode(url)
        current?.next = temp
        temp.prev = current
        current = current?.next
    }

    fun back(steps: Int): String {
        var stepsTaken = 0
        while(current?.prev != null && stepsTaken < steps) {
            current = current?.prev
            stepsTaken++
        }
        return current!!.page
    }

    fun forward(steps: Int): String {
        var stepsTaken = 0
        while(current?.next != null && stepsTaken < steps) {
            current = current?.next
            stepsTaken++
        }
        return current!!.page
    }

}

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */
