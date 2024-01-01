class Solution {
    fun reorganizeString(s: String): String {
        var count = HashMap<Char, Int>().apply {
            for (c in s)
                this[c] = getOrDefault(c, 0) + 1
        }

        val maxHeap = PriorityQueue<Pair<Int, Char>>() { a, b ->
            b.first - a.first
        }
        
        for ((ch, cnt) in count)
            maxHeap.add(cnt to ch)

        var prev: Pair<Int, Char>? = null
        var res = StringBuilder()
        while (maxHeap.isNotEmpty() || prev != null) {
            if (maxHeap.isEmpty() && prev != null)
                return ""

            var (cnt, ch) = maxHeap.poll()
            res.append(ch)
            cnt--

            prev?.let {
                maxHeap.add(it)
                prev = null
            }

            if (cnt != 0)
                prev = cnt to ch
        } 

        return res.toString()
    }
}

// another solution without heap
class Solution {
    fun reorganizeString(s: String): String {
        val freq = IntArray (26).apply {
            for (c in s) this[c - 'a']++
        }

        var maxFreq = -1
        var maxChar = -1
        for (letter in 0..25) {
            if (freq[letter] > maxFreq) {
                maxFreq = freq[letter]
                maxChar = letter
            }
        }

        if (maxFreq > (s.length + 1) / 2) return ""

        var i = 0
        val res = CharArray (s.length).apply {        
            while (freq[maxChar] > 0) {
                this[i] = 'a' + maxChar
                i += 2
                freq[maxChar]--
            }
        }

        for (letter in 0..25) {
            while (freq[letter] > 0) {
                if (i > s.lastIndex) i = 1
                res[i] = 'a' + letter
                i += 2
                freq[letter]--
            }      
        }

        return res.joinToString("")
    }
}
