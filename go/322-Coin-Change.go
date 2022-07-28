func min(x, y int) int {
    
    if x < y {
        return x
    }else{
        return y
    }
}

func coinChange(coins []int, amount int) int {
    
    INF := 65535
    size := amount+1
    
    // idx: money
    // value: minimal change count
    change := make([]int, size)
    
    
    // Initialized to infinity
    for idx, _ := range change{
        change[idx] = INF
    }
    
    // Initialization for $0
    change[0] = 0
    
    
    
    for value := 1; value <= amount; value += 1{
        
        for _, coin := range coins{
            
            if coin > value{
                
                // coin value is to big, can not make change with current coin
                continue
            }
            
            // update dp_table, try to make change with coin
            change[value] = min(change[value-coin]+1, change[value])
        }
    }
    
    if change[amount] == INF{
        
        // Reject, no solution
        return -1
        
    } else{
        
        // Accept, return total count of coin change
        return change[amount]
    }
    
    
}