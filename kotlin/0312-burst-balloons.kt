class Solution {
    fun maxCoins(nums: IntArray): Int {
        val newNums = intArrayOf(1) + nums + intArrayOf(1)
        val cache = Array(newNums.size){ IntArray(newNums.size) }
        
        fun dfs(left: Int, right: Int): Int{
            if(left > right) return 0
            if(cache[left][right] != 0) return cache[left][right]
            for(i in left..right){
                var coins = newNums[left-1] * newNums[i] * newNums[right+1]
                coins = coins + dfs(left, i-1) + dfs(i+1, right)
                cache[left][right] = maxOf(cache[left][right], coins)
            }
            return cache[left][right]
        }
        
        return dfs(1, newNums.size-2)
        
    }
    
}
