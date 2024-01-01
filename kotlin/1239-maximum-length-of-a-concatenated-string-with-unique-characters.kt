class Solution {
    fun maxLength(arr: List<String>): Int {
        val charSet = HashSet<Char>()

        fun overlap(s: String): Boolean {
            val count = s.freqThisAndSet(charSet)
            return count.values.max() > 1
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

    fun String.freqThisAndSet(set: HashSet<Char>) = buildMap<Char, Int> {
        this@freqThisAndSet.forEach { c ->
            this[c] = getOrDefault(c, 0) + 1
        }
        set.forEach { c -> 
            this[c] = getOrDefault(c, 0) + 1
        }
    }
}
