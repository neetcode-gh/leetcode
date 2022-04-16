package leetcode

func isValid(s string) bool {

	parantheses := map[string]string{
		")": "(",
		"}": "{",
		"]": "[",
	}

	stack := make([]string, 1)

	for i := 0; i < len(s); i++ {
		currChar := s[i]
		lastChar := stack[len(stack)-1]
		delChar := parantheses[string(currChar)]

		if delChar != "" {
			if delChar == lastChar {
				// pop
				if len(stack) > 0 {
					stack = stack[:len(stack)-1]
				}
			} else {
				return false
			}
		} else {
			// push
			stack = append(stack, string(currChar))
		}
	}

	return len(stack)-1 <= 0
}
