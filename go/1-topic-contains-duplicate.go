func containsDuplicate(nums []int) bool {
    m := map[int]int{}
    for _,v := range nums {
        if _,ok:=m[v]; ok {
            return true
        }
        m[v]++
    }   
    return false
}
// with respect to you neetcode-gh!
