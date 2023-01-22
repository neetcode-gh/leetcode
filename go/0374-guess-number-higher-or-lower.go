func guessNumber(n int) int {
    low := 1
    high := n
    
    for true {
        mid := low + (high - low)/2
        myGuess := guess(mid)
        if myGuess == 1 {
            low = mid + 1
        } else if myGuess == -1 {
            high = mid - 1
        } else {
            return mid
        }
    }
    return -1
}
