class Solution {
    fun kidsWithCandies(candies: IntArray, extraCandies: Int): List<Boolean> {
        val max = candies.max()!!
        val res = LinkedList<Boolean>()
        
        for (candy in candies) {
            if(candy + extraCandies >= max) {
                res.addLast(true)
            } else {
                res.addLast(false)
            }
        }
        
        return res
    }
}
