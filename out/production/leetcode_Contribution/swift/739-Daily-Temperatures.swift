class Solution {
    func dailyTemperatures(_ temperatures: [Int]) -> [Int] {
        let tempSize = temperatures.count
        var result = Array(repeating: 0, count: tempSize)
        
        for i in stride(from: tempSize - 1, through: 0, by: -1) {
            var j = i + 1
            
            while j < tempSize && temperatures[j] <= temperatures[i] {
                if result[j] <= 0 {
                    break
                }
                j += result[j]
            }
            
            if j < tempSize && temperatures[j] > temperatures[i] {
                result[i] = j - i
            }
        }
        
        return result
    }
}