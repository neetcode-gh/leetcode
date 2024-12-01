/*
* Optimized with Binary Search and Gauss summation formula: Time Complexity O(LogN) and Space Complexity O(1)
*/
class Solution {
    fun arrangeCoins(n: Int): Int {

        var left = 1
        var right = n
        var res = 0

        while (left <= right) {
            val mid = left + (right - left)  / 2 //avoid a potential 32bit Integer overflow (Where left is 1 and right is Integer.MAX_VALUE)
            val coins = (mid.toDouble() / 2) * (mid.toDouble() + 1)
            if(coins > n)
                right = mid -1
            else {
                left = mid + 1
                res = maxOf(res, mid)
            }
        }

        return res.toInt()
    }
}

/*
* Optimized and almost cheat-like solution (Technically not cheating) with both space and time complexity being O(1)
* Here we solve for x in gauss summation formula where the result is our input variable n:
* (x/2) * (x+1) = n ====> x = 1/2 * sqrt( 8n+1 ) -1 (We ignore the other possible solution since it gives us (wrong) negative x's
*/
class Solution {
    fun arrangeCoins(n: Int): Int {
        val x = 0.5 * Math.sqrt(8.0 * n.toDouble() + 1.0) - 1.0
        return Math.round(x).toInt() // round() will round up or down to nearest whole number, which we need to correctly output result
    }
}

// Or if you prefer oneliner:
class Solution {
    fun arrangeCoins(n: Int) = Math.round( 0.5 * Math.sqrt(8.0 * n.toDouble() + 1.0) - 1.0 ).toInt()
}


/*
* Naive way with brute force: Time Complexity O(N) and Space Complexity O(1)
*/
class Solution {
    fun arrangeCoins(_n: Int): Int {

        var res = 0
        var n = _n
        var step = 0

        while( true ) {
            step++
            if(n - step < 0) return res
            n -= step
            res++
        }

        return res
    }
}
