class Solution {
    fun ladderLength(beginWord: String, endWord: String, wordList: List<String>): Int {
        val set = wordList.toMutableSet()
        if (!set.contains(endWord))
            return 0

        val queue = LinkedList<String>()
        queue.add(beginWord)
        set.remove(beginWord)
        var step = 0

        while(queue.size != 0) {
            val size = queue.size
            step++;

            for (i in 0..size-1) {
                val curr = queue.poll()

                if (endWord.equals(curr))
                    return step

                val neighbors = getNeighbors(curr, set)
                for (neig in neighbors) {
                    queue.add(neig)
                    set.remove(neig)
                }
            }
        }

        return 0
    }

    fun getNeighbors(str: String, set: Set<String>): List<String> {
        val res = ArrayList<String>()
        val chars = str.toCharArray()

        for (i in 0..chars.size-1) {
            val temp = chars[i];

            for (j in 'a'..'z') {
                chars[i] = j
                val newStr = String(chars)
                if (set.contains(newStr))
                    res.add(newStr)
            }

            chars[i] = temp
        }

        return res
    }
}