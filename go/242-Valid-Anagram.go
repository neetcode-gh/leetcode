func isAnagram(s string, t string) bool {
    if len(s) != len(t) {
        return false
    }
    
    var freq [26]int
    
    for idx := 0; idx < len(s); idx++ {
        freq[s[idx] - 'a']++
        freq[t[idx] - 'a']--
    }
    
    for idx := 0; idx < len(freq); idx++ {
        if freq[idx] != 0 {
            return false
        }
    }
    
    return true
}