/*
* Linear search with window resizing. Time: O(N-K) and Space O(1) 
*/
class Solution {
    fun findClosestElements(arr: IntArray, k: Int, x: Int): List<Int> {
        
        val res = ArrayList<Int>()
        var left = 0
        var right = arr.lastIndex

        while (right - left + 1 > k) {
            if (Math.abs(arr[left] - x) > Math.abs(arr[right] - x))
                left++
            else
                right--
        }

        for(i in left..right) res.add(arr[i])

        return res
    }
}
