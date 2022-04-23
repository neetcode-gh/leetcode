package arrayAndHashing

func isAnagram(s string, t string) bool {
    chars := [26]int{}
    for _, c := range s {
        chars[c - 'a']++
    }
    for _, c := range t {
        chars[c - 'a']--
    }
    for _, v := range chars {
        if v != 0 {
            return false
        }
    }
    return true
}