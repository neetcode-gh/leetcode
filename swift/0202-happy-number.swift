class Solution {
    func isHappy(_ n: Int) -> Bool {
        var slow = n, fast = sumSquareDigits(n)
        
        while slow != fast {
            fast = sumSquareDigits(fast)
            fast = sumSquareDigits(fast)
            slow = sumSquareDigits(slow)
        }
        
        return fast == 1
    }
    
    func sumSquareDigits(_ n: Int) -> Int {
        var output = 0
        var num = n
        while num != 0 {
            let currDigit = num % 10
            output += currDigit * currDigit
            num /= 10
        }
        return output
    } 
}