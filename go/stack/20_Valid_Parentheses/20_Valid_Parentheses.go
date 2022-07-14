package validparentheses

type stack struct {
	arr []byte
}

func (s *stack) len() int {
	return len(s.arr)
}

func (s *stack) push(val byte) {
	s.arr = append(s.arr, val)
}

func (s *stack) pop() byte {
	var poppedVal byte
	if s.len() > 0 {
		poppedVal = s.arr[len(s.arr)-1]
		s.arr = s.arr[:s.len()-1]
		return poppedVal
	}
	return poppedVal
}

var charPairing = map[byte]byte{
	'{': '}',
	'[': ']',
	'(': ')',
}

func isValid(s string) bool {
	stack := stack{}
	for i := range s {
		if s[i] == '{' || s[i] == '[' || s[i] == '(' {
			stack.push(s[i])
		}
		if s[i] == '}' || s[i] == ']' || s[i] == ')' {
			var poppedVal byte
			if stack.len() > 0 {
				poppedVal = stack.pop()
			} else {
				return false
			}
			if charPairing[poppedVal] != s[i] {
				return false
			}
		}
	}
	return stack.len() == 0
}

func isValid_2(s string) bool {
	stack := []byte{}
	for i := range s {
		if s[i] == '{' || s[i] == '[' || s[i] == '(' {
			stack = append(stack, s[i])
		}
		if s[i] == '}' || s[i] == ']' || s[i] == ')' {
			var poppedVal byte
			if len(stack) > 0 {
				poppedVal = stack[len(stack)-1]
				stack = stack[:len(stack)-1]
			} else {
				return false
			}
			if charPairing[poppedVal] != s[i] {
				return false
			}
		}
	}
	return len(stack) == 0
}
