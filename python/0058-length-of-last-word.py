class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        """
	one shortcut
	"""
	#	return len(s.split()[-1])
        count = 0
	for i in range(len(s) - 1, -1, -1):
		char = s[i]
		if char == " ":
			if count >= 1:
				return count
		else:
			count += 1
	return count
