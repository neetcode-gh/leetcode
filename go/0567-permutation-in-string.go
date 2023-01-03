func checkInclusion(s1 string, s2 string) bool {
    if len(s1) > len(s2){
        return false
    }
    
    s1Count, s2Count := [26]int{}, [26]int{}
    for i, _ := range s1 {
        s1Count[s1[i] - 'a']++
        s2Count[s2[i] - 'a']++
    }
    matches := 0
    for i:=0;i<26;i++ {
        if s1Count[i] == s2Count[i] {
            matches += 1
        } else {
            matches += 0
        }
    }
    
    l := 0
    for r:=len(s1);r<len(s2);r++{
        if matches == 26 {
            return true
        }
        
        index := s2[r] - 'a'
        s2Count[index]++
        if s1Count[index] == s2Count[index]{
            matches++
        } else if s1Count[index] + 1 == s2Count[index]{
            matches--
        } 
        
        index = s2[l] - 'a'
        s2Count[index]--
        if s1Count[index] == s2Count[index]{
            matches++
        } else if s1Count[index] - 1 == s2Count[index]{
            matches--
        }
        l++
    }
    return matches == 26
}
