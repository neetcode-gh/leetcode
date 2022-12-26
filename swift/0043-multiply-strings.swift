class Solution {
    func multiply(_ num1: String, _ num2: String) -> String {
        if [num1, num2].contains("0") {
            return "0"
        }
        
        var res = Array(repeating: 0, count: num1.count + num2.count)
        
        let n1 = Array(num1.reversed())
        let n2 = Array(num2.reversed())
        
        for i1 in 0..<n1.count {
            for i2 in 0..<n2.count {
                let digit = Int(String(n1[i1]))! * Int(String(n2[i2]))!
                res[i1 + i2] += digit
                res[i1 + i2 + 1] += res[i1 + i2] / 10
                res[i1 + i2] = res[i1 + i2] % 10
            }
        }
        
        res = res.reversed()
        var beg = 0
        
        while beg < res.count && res[beg] == 0 {
            beg += 1
        }
        
        return res[beg..<res.count].map { String($0) }.joined(separator: "")
    }
}
