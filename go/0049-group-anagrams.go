package main

func groupAnagrams(strs []string) [][]string {
    anagramMap := make(map[[26]int][]string)
    for _, s := range strs {
        var count [26]int
        for _, c := range s {
            count[c - 'a']++
        }
        anagramMap[count] = append(anagramMap[count], s)
    }
    result := make([][]string, len(anagramMap))
    idx := 0
    for _, v := range anagramMap {
        result[idx] = v
        idx++
    }
    return result
}


