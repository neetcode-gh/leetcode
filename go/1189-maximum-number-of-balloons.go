func maxNumberOfBalloons(text string) int {
    countText := counter(text)
    balloon := counter("balloon")
    
    res := len(text)
    for c, _ := range balloon {
        res = min(res, countText[c] / balloon[c])
    }
    return res
}

func counter(text string) map[rune]int {
    count := make(map[rune]int)
    for _, c := range text {
        count[c] = count[c] + 1
    }
    return count
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
