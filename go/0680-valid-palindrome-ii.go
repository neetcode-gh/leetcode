func validPalindrome(s string) bool {
    i := 0
    j := len(s) - 1
    
    for i < j {
        if s[i] == s[j] {
            i += 1
            j -= 1
        } else {
            return validPalindromeUtil(s, i + 1, j) || validPalindromeUtil(s, i, j - 1)
        }
    }
    return true
}

func validPalindromeUtil(s string, i, j int) bool {
    for i < j {
        if s[i] == s[j] {
            i += 1
            j -= 1
        } else {
            return false
        }
    }
    return true
}
