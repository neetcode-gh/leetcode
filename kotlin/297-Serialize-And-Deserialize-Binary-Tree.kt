/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */

class Codec() {
    // Encodes a URL to a shortened URL.
    fun serialize(root: TreeNode?): String {
        val sb = StringBuilder()
        serialize(root, sb)
        return sb.toString()
    }

    // Decodes your encoded data to tree.
    fun deserialize(data: String): TreeNode? {
        val queue = LinkedList<String>()

        for (str in data.split(",")) {
            queue.add(str)
        }

        return deserialize(queue)
    }

    private fun serialize(root: TreeNode?, sb: StringBuilder) {
        if (root == null) {
            sb.append("null")
            sb.append(",")
            return
        }

        sb.append(root.`val`)
        sb.append(",")

        serialize(root.left, sb)
        serialize(root.right, sb)
    }

    private fun deserialize(queue: Queue<String>): TreeNode? {
        val str = queue.remove()

        if (str.equals("null")) {
            return null
        }

        val node = TreeNode(str.toInt())

        node.left = deserialize(queue)
        node.right = deserialize(queue)

        return node
    }
}

/**
 * Your Codec object will be instantiated and called as such:
 * var ser = Codec()
 * var deser = Codec()
 * var data = ser.serialize(longUrl)
 * var ans = deser.deserialize(data)
 */