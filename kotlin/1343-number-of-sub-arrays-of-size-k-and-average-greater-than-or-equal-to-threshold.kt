class Solution {
    fun numOfSubarrays(arr: IntArray, k: Int, threshold: Int): Int {
        
        var sum = 0
        var res = 0

        for (i in 0 until k-1) sum += arr[i]

        for (i in k-1 until arr.size) {
            sum += arr[i]
            if (sum / k >= threshold) res++
            sum -= arr[i-k+1]
        }

        return res
    }
}
