func asteroidCollision(asteroids []int) []int {

	stack := []int{}
	diff := 0

	for _, asteroid := range asteroids {
		for len(stack) > 0 && stack[len(stack)-1] > 0 && asteroid < 0 {
			diff = stack[len(stack)-1] + asteroid
			if diff < 0 {
				// asteroid larger than top of stack, destroys it
				stack = stack[0 : len(stack)-1]
			} else if diff == 0 {
				// asteroid and top of stack equal, both destroyed
				stack = stack[0 : len(stack)-1]
				asteroid = 0
			} else {
				// asteroid smaller than top of stack, gets destroyed
				asteroid = 0
			}
		}
		if asteroid != 0 {
			stack = append(stack, asteroid)
		}
	}

	return stack
}