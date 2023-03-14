// using fancy schmancy Kotlin way
class Solution {
    fun tribonacci(n: Int): Int {
        
        return when {
            n == 0 -> 0
            n == 1 -> 1
            n == 2 -> 1
            else -> run {
                var n0 = 0
                var n1 = 1
                var n2 = 1
                for (i in 3..n) {
                    val temp = n0 + n1 + n2
                    n0 = n1
                    n1 = n2
                    n2 = temp
                }
                n2
            }
        }     
    }
}

//normal way to do it (Java safe)
class Solution {
    fun tribonacci(n: Int): Int {

        var numbers = intArrayOf(0,1,1)   

        if (n < 3) return numbers[n]
        for (i in 3..n) {
            val temp = numbers[0] + numbers[1] + numbers[2]
            numbers[0] = numbers[1]
            numbers[1] = numbers[2]
            numbers[2] = temp
        }    
        
        return numbers[2]
    }
}
