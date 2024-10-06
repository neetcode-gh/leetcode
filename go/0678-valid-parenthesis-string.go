func checkValidString(s string) bool {
	stars := 0
	open := 0
	for _, v := range s {
		if v == '(' {
			open++
		} else if v == ')' {
			if open > 0 {
				open--
			} else if stars > 0 {
				stars--
			} else {
				return false
			}
		} else {
			stars++
		}
	}

	close := 0
	stars = 0
	for i := len(s) - 1; i >= 0; i-- {
		v := s[i]
		if v == ')' {
			close++
		} else if v == '(' {
			if close > 0 {
				close--
			} else if stars > 0 {
				stars--
			} else {
				return false
			}
		} else {
			stars++
		}
	}
	return true
}