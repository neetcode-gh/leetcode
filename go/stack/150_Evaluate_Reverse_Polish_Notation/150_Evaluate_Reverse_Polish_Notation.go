package evaluatereversepolishnotation

import "strconv"

var validOperators = map[string]bool{
	"+": true,
	"-": true,
	"*": true,
	"/": true,
}

func evalRPN(tokens []string) int {
	var stack []int
	for i := range tokens {
		_, ok := validOperators[tokens[i]]
		if !ok {
			integer, _ := strconv.Atoi(tokens[i])
			stack = append(stack, integer)
		} else {
			poppedVal1 := stack[len(stack)-1]
			poppedVal2 := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			stack = append(stack, performOperaton(poppedVal1, poppedVal2, tokens[i]))
		}
	}
	return stack[len(stack)-1]
}

func performOperaton(num1 int, num2 int, operator string) int {
	var result int
	if operator == "+" {
		result = num1 + num2
	} else if operator == "-" {
		result = num2 - num1
	} else if operator == "/" {
		result = num2 / num1
	} else if operator == "*" {
		result = num1 * num2
	}
	return result
}
