class Solution {
    func checkInclusion(_ s1: String, _ s2: String) -> Bool {
        let s1 = Array(s1)
        let s2 = Array(s2)
        
        var s1ArrF = Array(repeating: 0, count: 26) // F - frequencies
        var s2ArrF = s1ArrF
        
        for char in s1 {
            s1ArrF[Int(char.asciiValue! - 97)] += 1
        }

        for i in 0 ..< s2.count {
            if i >= s1.count {
                // Shift the pointer one step to the right
                s2ArrF[Int(s2[i - s1.count].asciiValue! - 97)] -= 1
            }
            
            s2ArrF[Int(s2[i].asciiValue! - 97)] += 1
            
            if s1ArrF == s2ArrF { 
                return true 
            }
        }
        return false
    }
}