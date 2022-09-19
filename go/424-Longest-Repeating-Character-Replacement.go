func characterReplacement(s string, k int) int {
    count := make(map[byte]int)
    res := 0
    
    l := 0
    maxf := 0
    for r, _ := range s {
        count[s[r]] = 1 + count[s[r]]
        maxf = max(maxf, count[s[r]])
        
        if (r - l + 1) - maxf > k{
            count[s[l]] -= 1
            l++
        }
        res = max(res, r - l + 1)
    }
    return res
}

func max(a,b int) int {
    if a > b {
        return a
    }
    return b
}
