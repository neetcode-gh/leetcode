func isAnagram(s string, t string) bool {

	if len(s) != len(t) {
		return false
	}

	s_map := map[rune]int{}
	t_map := map[rune]int{}

	for _, c := range s {
		if _, ok := s_map[c]; !ok {
			s_map[c] = 1
		} else {
			s_map[c] += 1
		}
	}

	for _, c := range t {
		if _, ok := t_map[c]; !ok {
			t_map[c] = 1
		} else {
			t_map[c] += 1
		}
	}

	for _, c := range s {
		if s_map[c] != t_map[c] {
			return false
		}
	}

	return true

}
		
	