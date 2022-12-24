func dailyTemperatures(temperatures []int) []int {
    result := make([]int, len(temperatures))
    
    for i := len(temperatures) - 1; i >= 0; i-- {
        j := i + 1
        
        for j < len(temperatures) && temperatures[j] <= temperatures[i] {
            if result[j] <= 0 {
                break
            }
            j += result[j]
        } 
        
        if j < len(temperatures) && temperatures[j] > temperatures[i] {
            result[i] = j - i
        }
        
    }
    return result
}