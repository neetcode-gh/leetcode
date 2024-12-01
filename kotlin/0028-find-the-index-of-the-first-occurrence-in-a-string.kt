/*
* KMP algorithm
*/
class Solution {
    fun strStr(haystack: String, needle: String): Int {
        if(needle == "") return 0

        val lps = IntArray(needle.length)
        var prevLPS = 0
        var i = 1
        while(i < needle.length) {
            if(needle[i] == needle[prevLPS]) {
                lps[i] = prevLPS + 1
                prevLPS++
                i++
            }else if(prevLPS == 0) {
                lps[i] = 0
                i++
            }else{
                prevLPS = lps[prevLPS - 1]
            }
        }

        i = 0
        var j = 0
        while (i < haystack.length) {
            if(haystack[i] == needle[j]){
                i++
                j++
            }else if(j == 0){
                i++
            }else{
                j = lps[j - 1] 
            }
            if(j == needle.length) {
                return i - needle.length
            }     
        }
        
        return -1
    }
}

/*
* Rabin-Karp string hashing with bad hash
*/
class Solution {
    fun strStr(haystack: String, needle: String): Int {
        if(needle.length > haystack.length) return -1

        var needleHash = 0
        var hayHash = 0

        for(i in 0..needle.lastIndex) {
            needleHash += needle[i] - 'a'
            hayHash += haystack[i] - 'a'
        }

        for(i in 0..(haystack.length - needle.length)) {
            if(hayHash == needleHash) {
                for(j in 0..needle.lastIndex) {
                    if(haystack[i + j] != needle[j])
                        break
                    if(j == needle.lastIndex)
                        return i
                }
            }
            if(i == haystack.length - needle.length)
                break
            hayHash -= haystack[i] - 'a'
            hayHash += haystack[i + needle.length] - 'a'
        }

        return -1
    }
}

/*
* Rabin-karp with proper hash. q should ideally be chosen as an high prime number to avoid no. of collisions.
*/
class Solution {
    fun strStr(haystack: String, needle: String): Int {
        if(needle.length > haystack.length) return -1

        val q = 101
        val d = 256
        var needleHash = 0
        var hayHash = 0
        var hash = 1

        for (i in 0..needle.lastIndex)
            hash = (hash * d) % q

        for(i in 0..needle.lastIndex) {
            needleHash = (d * needleHash + (needle[i] - 'a')) % q
            hayHash = (d * hayHash + (haystack[i] - 'a')) % q
        }

        for(i in 0..(haystack.length - needle.length)) {
            if(hayHash == needleHash) {
                for(j in 0..needle.lastIndex) {
                    if(haystack[i + j] != needle[j])
                        break
                    if(j == needle.lastIndex)
                        return i
                }
            }
            if(i == haystack.length - needle.length)
                break
            hayHash = (d * hayHash - ((haystack[i]  - 'a') * hash) + (haystack[i + needle.length] - 'a')) % q
            if(hayHash < 0)
                hayHash += q
        }

        return -1
    }
}

/*
* Using Trie to match pattern
*/
class TrieNode() {
    val child = arrayOfNulls<TrieNode>(26)
    var isEnd = false
}

class Solution {
    fun strStr(haystack: String, needle: String): Int {
        if(needle == "") return 0

        var root: TrieNode? = TrieNode()

        var current = root
        for(c in needle){
            if(current?.child?.get(c - 'a') == null)
                current?.child?.set(c - 'a', TrieNode())
            current = current?.child?.get(c - 'a')
        }
        current?.isEnd = true

        var i = 0
        while(i < haystack.length + 1 - needle.length) {
            current = root?.child?.get(haystack[i] - 'a')
            var j = i
            while(current != null) {
                if(current.isEnd == true)
                    return i
                j++
                if(j - i < needle.length)
                    current = current?.child?.get(haystack[j] - 'a')
                else
                    break
            }
            i++
        }

        return -1
    }
}

/*
* Brute force 
*/
class Solution {
    fun strStr(haystack: String, needle: String): Int {
        if(needle == "") return 0

        for(i in 0..(haystack.length - needle.length)) {
            for(j in 0..needle.lastIndex) {
                if(haystack[i + j] != needle[j])
                    break
                if(j == needle.lastIndex)
                    return i
            }
        }

        return -1
    }
}
