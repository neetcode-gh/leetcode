class Solution {
    func plusOne(_ digits: [Int]) -> [Int] {
        // parameters are immutable in swift
        var digit = digits
        for i in stride(from: digit.count - 1, through: 0, by: -1) {
            digit[i] += 1
            
            if digit[i] <= 9 {
                return digit
            }
            
            digit[i] = 0
        }
        
        digit.insert(1, at: 0)
        return digit
    }
}