func lengthOfLastWord(s string) int {
	s = strings.TrimSpace(s)

	words := strings.Fields(s)

	lastWord := words[len(words)-1]

	return len(lastWord)
}
