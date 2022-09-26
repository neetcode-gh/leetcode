func isValid(s string) bool {
	stack := make([]rune, 0)
	matchingBrackets := map[rune]rune{
		')': '(',
		']': '[',
		'}': '{',
	}
	for _, bracket := range s {
		switch bracket {
		case '(', '{', '[':
			stack = append(stack, bracket)
		case ')', '}', ']':
			if len(stack) == 0 || stack[len(stack)-1] != matchingBrackets[bracket] {
				return false
			}

			stack = stack[:len(stack)-1]
		}
	}

	return len(stack) == 0
}