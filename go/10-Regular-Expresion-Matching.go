func isMatch(s string, p string) bool {

    var dfs func(int, int) bool
    type key [2]int
    
    cache := make(map[key]bool)
    
    dfs = func(i,j int) bool {
        
        if i >= len(s) && j >= len(p) {
            return true
        } else if j >= len(p) {
            return false
        }
        
        if result_in_cache, ok := cache[[2]int{i,j}]; ok {
            return result_in_cache
        }
        
        // The condition for a match
        match := i < len(s) && (string(s[i]) == string(p[j]) || string(p[j]) == ".")
        
        var res bool
        
        // If the next character is a *
        if (j+1 < len(p) && string(p[j+1]) == "*") {
            res = (dfs(i,j+2) || // Skip matching current char. and move on to next char. ||
                  (match && dfs(i+1,j))) // Confirm  char. in 's' matches char. in 'p' && match next char of 's' with "*" too.
        } else if match {
            res = dfs(i+1, j+1) // Only move to next pos. if char in 's' matches char in 'p' 
        } else {
            res = false 
        }
        
        cache[[2]int{i,j}] = res
        return res
    }
    
    return dfs(0,0)
}