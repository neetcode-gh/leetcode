func findRepeatedDnaSequences(s string) []string {
	seen, res := map[string]bool{}, map[string]bool{}

	for l := range len(s) - 9 {
		cur := s[l : l+10]
		if seen[cur] {
			res[cur] = true
		}
		seen[cur] = true
	}
	return slices.Collect(maps.Keys(res))
}
