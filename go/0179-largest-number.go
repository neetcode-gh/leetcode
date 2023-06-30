func largestNumber(nums []int) string {
    ans, s := "", make([]string, len(nums))
    for i, num := range nums { s[i] = strconv.Itoa(num) }
    sort.Slice(s, func(a, b int) bool { return s[a] + s[b] > s[b] + s[a] })
    if s[0] == "0" { return "0" }
    for _, v := range s { ans += v }
    return ans
}