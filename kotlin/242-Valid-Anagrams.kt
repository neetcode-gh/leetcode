class Solution {
    fun isAnagram(s: String, t: String): Boolean {
        if(s.length != t.length) {
            return false
        }
        var frequency = mutableMapOf<Char, Int>() 
        for (c in s){
            frequency[c] = frequency.getOrDefault(c,0) + 1
        }
        for (c in t){
            frequency[c] = frequency.getOrDefault(c,0) - 1
            if (frequency[c] == 0){
                frequency.remove(c)
            }
        }
        return frequency.isEmpty()
    }
}
