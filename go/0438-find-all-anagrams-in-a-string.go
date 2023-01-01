func findAnagrams(s string, p string) []int {
    startIndex := 0
    pMap := make(map[byte]int)
    sMap := make(map[byte]int)
    var res []int
    
    for i := 0; i < len(p); i++ {
        pMap[p[i]] = 1 + pMap[p[i]]
    }
    
    for i := 0; i < len(s); i++ {
        sMap[s[i]] = 1 + sMap[s[i]]
        
        if i >= len(p) - 1 {
            if equals(sMap, pMap) {
                res = append(res, startIndex)
            }
            
            if _, ok := sMap[s[startIndex]]; ok {
                sMap[s[startIndex]] = sMap[s[startIndex]] - 1
                if sMap[s[startIndex]] == 0 {
                    delete(sMap, s[startIndex])
                }
            }
            startIndex += 1
        }
    }
    return res
}

func equals(a, b map[byte]int) bool {
    for k, v := range a {
        if b[k] != v {
            return false
        }
    }
    return true
}
