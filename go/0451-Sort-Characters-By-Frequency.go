func frequencySort(s string) string {
    type charFreq struct {
        c rune
        f int
    }

    mp := map[rune]int{}
    cs := []charFreq{}

    for _, c := range s {
        mp[c]++
    }

    for c, f := range mp {
        cs = append(cs, charFreq{c,f})
    }

    sort.Slice(cs, func(i,j int) bool{
        return cs[i].f > cs[j].f
    })

    ans := ""

    for _, cf := range cs {
        ans += strings.Repeat(string(cf.c), cf.f)
    }

    return ans
}
