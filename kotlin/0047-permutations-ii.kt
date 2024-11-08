class Solution {
    fun permuteUnique(nums: IntArray): List<List<Int>> {
        val count = HashMap<Int, Int>()
        val permut = LinkedList<Int>()
        val res = LinkedList<LinkedList<Int>>()
        
        for (n in nums) count[n] = count.getOrDefault(n, 0) + 1

        fun backtrack() {
            if (permut.size == nums.size) {
                res.add(LinkedList(permut))
                return
            }
            
            for (n in count.keys) {
                if (count[n]!! > 0) {
                    permut.addLast(n)
                    count[n] = count[n]!! - 1

                    backtrack()

                    count[n] = count[n]!! + 1
                    permut.removeLast()
                }     
            }
        }

        backtrack()
        return res
    }
}
