class Solution {
    fun canPlaceFlowers(flowerbed: IntArray, n: Int): Boolean {
        var planted = 0
        for(i in 0 until flowerbed.size) {
            if(flowerbed[i] == 0){
                val prev = if(i == 0) 0 else flowerbed[i-1]
                val next = if(i == flowerbed.size-1) 0 else flowerbed[i+1]
                if(prev == 0 && next == 0){
                    planted++
                    flowerbed[i] = 1
                }
                if(planted == n) return true
            }
        }
        return planted >= n
    }
}
