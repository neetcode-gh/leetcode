// Two pointer solution, time O(n) and space O(1)
class Solution {
    fun backspaceCompare(s: String, t: String): Boolean {
        
        fun nextValidChar(str: String, _index: Int): Int {
            var backspace = 0
            var index = _index
            while (index >= 0) {
                if (backspace == 0 && str[index] != '#')
                    break
                else if (str[index] == '#')
                    backspace++
                else
                    backspace--
                index--
            }

            return index
        }

        var index_s = s.lastIndex
        var index_t = t.lastIndex
        while (index_s >= 0 || index_t >= 0) {
            index_s = nextValidChar(s, index_s)
            index_t = nextValidChar(t, index_t)

            val char_s = if (index_s >= 0) s[index_s] else '?'
            val char_t = if (index_t >= 0) t[index_t] else '?'
            if (char_s != char_t) 
                return false
            index_s--
            index_t--
        }

        return true
    }
}

// Stack solution, time O(n) and space O(n)
class Solution {
    fun backspaceCompare(s: String, t: String): Boolean {
        val s1 = LinkedList<Char>()
        val s2 = LinkedList<Char>()

        for (c in s) {
            if (c == '#') {
                if (s1.isNotEmpty())
                    s1.removeLast()
            } else {
                s1.addLast(c)
            } 
        }

        for (c in t) {
            if (c == '#') {
                if (s2.isNotEmpty())
                    s2.removeLast()
            } else {
                s2.addLast(c)
            } 
        }

        return s1.joinToString("") == s2.joinToString("")
    }
}

// Another style of two pointer solution, same idea, without calling methods, time O(n) and space O(1)
class Solution {
    fun backspaceCompare(s: String, t: String): Boolean {
        var i = s.lastIndex
        var j = t.lastIndex
        var steps = 0

        while (true) {
            steps = 0
            while (i >= 0 && (steps > 0 || s[i] == '#')) {
                steps += if (s[i] == '#') 1 else -1
                i--
            }

            steps = 0
            while (j >= 0 && (steps > 0 || t[j] == '#')) {
                steps += if (t[j] == '#') 1 else -1
                j--
            }

            if (i >= 0 && j >= 0 && s[i] == t[j]) {
                i--
                j--
            } else {
                break
            }
        }

        return i == -1 && j == -1
    }
}
