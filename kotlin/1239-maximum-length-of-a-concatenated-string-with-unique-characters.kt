class Solution {
    fun maxLength(arr: List<String>): Int {
        val charSet = HashSet<Char>()

        fun overlap(s: String): Boolean {
            val count = IntArray (26)

            for (c in s) count[c - 'a']++
            for (c in charSet) count[c - 'a']++

            return count.any { it > 1 }
        }   

        fun backtrack(i: Int): Int {
            if (i == arr.size)
                return charSet.size
            
            var res = 0
            if (!overlap(arr[i])) {
                for (c in arr[i])
                    charSet.add(c)
                res = backtrack(i + 1)
                for (c in arr[i])
                    charSet.remove(c)
            }

            return maxOf(res, backtrack(i + 1))
        }

        return backtrack(0)
    }
}
