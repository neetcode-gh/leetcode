func groupAnagrams(strs []string) [][]string {
	resMap := make(map[[26]int][]string)

	for _, str := range strs {
		key := [26]int{}
		for _, char := range str {
			index := int(char - 'a')
			key[index]++
		}
		resMap[key] = append(resMap[key], str)
	}

	res := make([][]string, 0)
	for _, val := range resMap {
		res = append(res, val)
	}

	return res
}