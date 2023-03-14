from collections import Counter

class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        r_counter = Counter(ransomNote)
        m_counter = Counter(magazine)
        # magazine contains (>=) ransomNote
        for c in ransomNote:
            if m_counter[c] < r_counter[c]:
                return False
        return True
