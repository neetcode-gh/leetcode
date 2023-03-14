class Solution {
    fun combine(n: Int, k: Int): List<List<Int>> {

        val res = ArrayList<ArrayList<Int>>()

        fun backtrack(start: Int, comb: ArrayList<Int>) {
            if(comb.size == k) {
                res.add(ArrayList(comb))
                return
            }

            for(i in start..n) {
                comb.add(i)
                backtrack(i + 1, comb)
                comb.removeAt(comb.size-1)
            }
        }
        
        backtrack(1, ArrayList<Int>())
        return res
    }
}
