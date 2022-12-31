class Solution {
    fun myPow(x: Double, n: Int): Double {
        val sum = myPowHelper(x, n)
        return if(n < 0) 1/sum else sum // if power to the negative
    }
    private fun myPowHelper(x: Double, n: Int): Double {
        if(x == 0.0)
            return 0.0
        when(n){
            0 -> return 1.0
            1 -> return x
            else -> {
                var res = myPowHelper(x, n/2)
                res *= res
                return if(n%2==0) res else x * res //if odd number, we multiply the "lost" number from integer division
            }
        }
    }
}
