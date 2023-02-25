func maxProfit(prices []int) int {
    sold, hold, rest := 0, math.MinInt32, 0
    
    for i := 0; i < len(prices); i++ {
        prevSold := sold
        sold = hold + prices[i]
        hold = max(hold, rest - prices[i])
        rest = max(rest, prevSold)
    }
    return max(sold, rest)
}

// Golang does not have a built-in max for integers
func max(a int, b int) int {
    if (a > b) {
        return a
    }
    return b
}