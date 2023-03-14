class Solution {
    fun isIsomorphic(s: String, t: String): Boolean {
        val hm = HashMap<Char, Char>()
        for(i in 0 until s.length){
            if(s[i] !in hm.keys){
                if(t[i] in hm.values) return false
                hm.put(s[i], t[i])
            }else if (hm.get(s[i]) != t[i]) return false
        }
        return true
    }
}
