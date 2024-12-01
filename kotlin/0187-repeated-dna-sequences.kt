/*
* Storing the 10-character long strings in our sets. 
*/
class Solution {
    fun findRepeatedDnaSequences(s: String): List<String> {
        val found = HashSet<String>()
        val res = HashSet<String>()
        for(i in 0..s.lastIndex-9) {
            val str = s.substring(i..i+9)
            if(str !in found) found.add(str)
            else res.add(str)
        }
        return res.toList()
    }
}

/*
* Storing the 10-character long strings as 20bit long Integers, a small optimization over the above solution
*/
class Solution {
    fun findRepeatedDnaSequences(s: String): List<String> {

        val found = HashSet<Int>()
        val res = HashSet<String>()
        val mapper = hashMapOf('A' to 0, 'C' to 1, 'G' to 2, 'T' to 3)

        var value = 0

        for(i in 0..s.lastIndex) {

            value = value shl 2
            value = value or mapper[s[i]]!!
            value = value and 0xfffff

            if(i < 9) continue
            if(value in found) res.add(s.substring(i-9..i))
            else found.add(value)
            
        }

        return res.toList()
    }
}
