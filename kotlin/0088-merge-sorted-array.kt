class Solution {
    fun merge(n1: IntArray, m: Int, n2: IntArray, n: Int): Unit {
        var end = n1.lastIndex
        var i = m - 1
        var j = n - 1
        
        while (i >= 0 && j >= 0) {
            if (n1[i] > n2[j]) {
                n1[end] = n1[i]
                i--
            } else {
                n1[end] = n2[j]
                j--
            }
            end--
        }

        while (j >= 0) {
            n1[end] = n2[j]
            j--
            end--
        }
    }
}
