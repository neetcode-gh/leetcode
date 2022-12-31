class Solution {
    fun isAlienSorted(words: Array<String>, order: String): Boolean {
        val hm = HashMap<Char, Int>()
        for((i, c) in order.withIndex())
            hm[c] = i
        for(i in 0 until words.size-1){
            val firstW = words[i]
            val secondW = words[i+1]
            for(j in 0 until firstW.length){
                if(j == secondW.length) // if first word is longer than second word
                    return false
                if(firstW[j] != secondW[j]){
                    if(hm[secondW[j]]!! < hm[firstW[j]]!!) //if char is not sorted lexicographically, char j in first must come before char j in second
                        return false
                    break // else if first word comes before second
                }      
            }
        }
        return true // if all words were sorted lexicographically 
    }
}
