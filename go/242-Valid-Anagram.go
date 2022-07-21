package arrayAndHashing

func isAnagram(s string, t string) bool {
    if len(s) > len(t) || len(t) > len(s){
        return false
    }
    smap := make(map[rune]int)
    for _, x := range(s) {
        smap[x] = smap[x]+1
    }
    for _, y := range(t) {
        smap[y] = smap[y]-1
        if smap[y] < 0 {
            return false
        }
    }    
    return true
}
