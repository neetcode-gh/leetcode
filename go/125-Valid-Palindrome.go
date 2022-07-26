func isPalindrome(s string) bool {
	i := 0
	j := len(s) - 1
	arr := []rune(s)

	for i < j {
		left := unicode.ToLower(arr[i])
		right := unicode.ToLower(arr[j])

		if !isLetterOrDigit(left) {
			i++
			continue
		}

		if !isLetterOrDigit(right) {
			j--
			continue
		}

		if left != right {
			return false
		}

		i++
		j--
	}

	return true
}

func isLetterOrDigit(s rune) bool {
	return unicode.IsLetter(s) || unicode.IsDigit(s)
}