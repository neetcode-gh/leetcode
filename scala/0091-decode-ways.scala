object Solution {
    def numDecodings(s: String): Int = {
        var (next, nextTwo) = (0, 1)
        if (s(s.length - 1) != '0') {
            next = 1
        }
        
        for (i <- s.length - 2 to 0 by -1) {
            val tmp = next
            if (s(i) != '0') {
                val isTwoDigitsValid = (s(i) == '1' && s(i+1).asDigit <= 9) ||
                    (s(i) == '2' && s(i+1).asDigit <= 6)
                if (isTwoDigitsValid) {
                    next = next + nextTwo        
                }
            } else {
                next = 0
            }
            nextTwo = tmp
        }
        
        return next 
    }
}