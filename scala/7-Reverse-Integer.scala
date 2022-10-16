object Solution {
    def reverse(x: Int): Int = {
        if (!isValidInteger(x)) return 0
        if (x < 0) -reverseInteger(-x) else reverseInteger(x)
    }
    
    def reverseInteger(x: Int): Int = {
        var result: Long = 0
        var temp = x
        
        while (temp != 0) {
            result *= 10 
            result += temp % 10
            if (!isValidInteger(result)) return 0
            temp /= 10
        }
        
        result.toInt
    }
    
    def isValidInteger(x: Long): Boolean = {
        if (x > Int.MaxValue || x < Int.MinValue) {
            return false
        }
        true
    }
}
