// For every word, check that its reverse equals it 
class Solution {
    fun firstPalindrome(words: Array<String>): String {
        words.forEach { word ->
            if (word == word.reversed())
                return word
        }

        return ""
    }
}

// For every word, check that its reverse equals it but using two pointers
class Solution {
    fun firstPalindrome(words: Array<String>): String {
        words.forEach { word ->
            var l = 0
            var r = word.lastIndex
            while (word[l] == word[r]) {
                if (l >= r) return word
                l++
                r--
            }
        }

        return ""
    }
}

// For every word, check that its reverse equals it but using two pointers with slightly different logic
class Solution {
    fun firstPalindrome(words: Array<String>): String {
        words.forEach { w ->
            var l = 0
            var r = w.lastIndex
            while (l < r && w[l] == w[r]) {
                l++
                r--
            }
            
            if (w.length % 2 == 1 && l == r || l == r + 1) return w
        }

        return ""
    }
}

// Use Kotlins power to condense the solution
class Solution {
    fun firstPalindrome(words: Array<String>) = words
        .firstOrNull { it == it.reversed() } ?: ""
}
