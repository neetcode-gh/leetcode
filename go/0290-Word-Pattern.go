import "strings"

func wordPattern(pattern string, s string) bool {
	sliceS := strings.Split(s, " ")
	if len(pattern) != len(sliceS) {
		return false
	}
	mapP, mapS := map[byte]string{}, map[string]byte{}

	for i := 0; i < len(pattern); i++ {
		valP, okP := mapP[pattern[i]]
		valS, okS := mapS[sliceS[i]]

		if (okP && valP != sliceS[i]) || (okS && valS != pattern[i]) {
			return false
		}
		mapP[pattern[i]] = sliceS[i]
		mapS[sliceS[i]] = pattern[i]
	}
	return true
}
