class Solution {
    fun distinctNames(ideas: Array<String>): Long {
        
        val firstToSuffix = Array(26) { hashSetOf<String>() }
        var res = 0L

        ideas.forEach { 
            firstToSuffix[it[0] - 'a'].add(it.substring(1, it.length))
        }

        for (i in 0 until 26) {
            for (j in i until 26) {
                val common = firstToSuffix[i].intersect(firstToSuffix[j]).size
                val mapI = firstToSuffix[i].size - common
                val mapJ = firstToSuffix[j].size - common
                res += (mapI * mapJ) * 2
            }
        }

        return res
    }
}

// without using kotlins intersect() funtions
class Solution {
    fun distinctNames(ideas: Array<String>): Long {
        
        val firstToSuffix = Array(26) { hashSetOf<String>() }
        var res = 0L

        ideas.forEach { 
            firstToSuffix[it[0] - 'a'].add(it.substring(1, it.length))
        }

        for (i in 0 until 26) {
            for (j in i until 26) {

                var common = 0
                for(wordA in firstToSuffix[i]) {
                    if(wordA in firstToSuffix[j]) common++
                }
                val mapI = firstToSuffix[i].size - common
                val mapJ = firstToSuffix[j].size - common
                res += (mapI * mapJ) * 2
            }
        }

        return res
    }
}
