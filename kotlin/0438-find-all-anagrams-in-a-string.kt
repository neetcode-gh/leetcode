class Solution {
    fun findAnagrams(s: String, p: String): List<Int> {
        
        val pCount = IntArray(26)
        val res = ArrayList<Int>()
        
        for(c in p)
            pCount[c - 'a']++
        
        var start = 0
        var end = 0
        
        while(end < s.length){
            // increase the window
            if(pCount[s[end] - 'a'] > 0){
                pCount[s[end++] - 'a']--
                if(end-start == p.length)
                    res.add(start)
            // window size 0? step to next
            }else if(start == end){
                start++
                end++
            //decrease the window
            }else{
                pCount[s[start++] - 'a']++
            }
        }
        
        return res
    }
}
