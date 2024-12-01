/*
* Using 2 variables for the pointers
*/
class Solution {
    fun reverseString(s: CharArray): Unit {
        var low = 0
        var high = s.size-1
        while(low < high){
            val temp = s[high]
            s[high] = s[low]
            s[low] = temp
            low++
            high--
        }
    }
}

/*
* Using one variable for the pointers
*/
class Solution {
    fun reverseString(s: CharArray): Unit {
        val size = s.size
        for(i in 0 until size/2){
            val temp = s[i]
            s[i] = s[size-1-i]
            s[size-1-i] = temp
        }
    }
}
