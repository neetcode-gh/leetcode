/*
* Solution as per the channel
*/
class Solution {
    fun longestCommonPrefix(strs: Array<String>): String {
        var len = 0
        outerloop@ for(i in 0 until strs[0].length){
            for(s in strs){
                if(i == s.length || s[i] != strs[0][i]){
                    break@outerloop
                }
            }
            len++
        }   
        return strs[0].substring(0,len)
    }
}

/*
* Same solution as above but a little more in an idiomatic Kotlin way
*/
class Solution {
    fun longestCommonPrefix(strs: Array<String>): String {
        var res = ""
        strs.minBy { it.length }?.forEachIndexed { i,c ->
            if(strs.all { it[i] == c } ) res += c else return res      
        }
        return res
    }
}

/*
* Trie solution
*/
class TrieNode() {
    val child = arrayOfNulls<TrieNode>(26)
    var isEnd = false
    fun childCount() = this.child?.filter{it != null}?.count()
}

class Solution {
    fun longestCommonPrefix(strs: Array<String>): String {
        
        val root: TrieNode? = TrieNode()

        for(word in strs) {
            var current = root
            for(c in word){
                if(current?.child?.get(c - 'a') == null){
                    current?.child?.set(c - 'a', TrieNode())
                }         
                current = current?.child?.get(c - 'a')
            }
            current?.isEnd = true
        }
        
        var current = root
        var len = 0
        for (c in strs[0]){
            println(c)
            if (current?.childCount() == 1 && current?.isEnd != true) len++ else break
            current = current?.child?.get(c - 'a')
        }
        println(len)
        return strs[0].substring(0,len)
    }
}

/*
* Sorting solution
*/
class Solution {
    fun longestCommonPrefix(strs: Array<String>): String { 
        var len = 0
        strs.sort()
        val first = strs[0]
        val last = strs[strs.size-1]
        val minLen = strs.minBy {it.length}?.length!!
        for(i in 0 until minLen){
            if(first[i] == last[i]) len++ else break
        }
        return strs[0].substring(0,len)
    }
}
