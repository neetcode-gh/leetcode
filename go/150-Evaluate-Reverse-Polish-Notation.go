func evalRPN(tokens []string) int {
	var stack []int
	var a, b int
	for _, c := range tokens {
		switch c {
		case "+":
			a, b, stack = getAndPopLastOperand(stack)
			stack = append(stack, (a + b))
		case "-":
			a, b, stack = getAndPopLastOperand(stack)
			stack = append(stack, (a - b))
		case "*":
			a, b, stack = getAndPopLastOperand(stack)
			stack = append(stack, (a * b))
		case "/":
			a, b, stack = getAndPopLastOperand(stack)
			stack = append(stack, (a / b))
		default:
			i, _ := strconv.Atoi(c)
			stack = append(stack, i)
		}
	}
	return stack[0]
}

func getAndPopLastOperand(stack []int) (int, int, []int) {
	a := stack[len(stack)-2]
	b := stack[len(stack)-1]
	stack = stack[:len(stack)-2]

	return a, b, stack
}