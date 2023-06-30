class Solution:
    def reverseWords(self, s: str) -> str:
        # Remove leading and trailing spaces
        s = s.strip()
        
        # Split the string into words
        words = s.split()
        
        # Reverse the order of words
        words = words[::-1]
        
        # Join the words with a single space
        reversed_str = ' '.join(words)
        
        return reversed_str
