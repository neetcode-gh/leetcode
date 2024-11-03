class Solution:
    def findRepeatedDnaSequences(self, s: str) -> list[str]:
        result = set()
        previous_sequences = set()
        for i in range(len(s) - 9):
            current = s[i:i+10]
            if current in previous_sequences:
                result.add(current)
            previous_sequences.add(current)
        return list(result)
