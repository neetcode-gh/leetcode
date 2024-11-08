class Solution {
    fun simplifyPath(path: String): String {
        val stack = LinkedList<String>()
        val invalids = hashSetOf("", ".", "..")

        path.split("/").forEach{
            if(it == ".." && stack.isNotEmpty()) {
                stack.removeLast()
            } else if (it !in invalids) {
                stack.addLast(it)
            } 
        }

        return if(stack.isEmpty()) "/" else StringBuilder().apply{
            while (stack.isNotEmpty()) {
                this.append("/")
                this.append(stack.removeFirst())
            }
        }.toString()
    }
}
