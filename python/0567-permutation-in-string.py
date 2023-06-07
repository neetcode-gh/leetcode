class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        # s1 is longer than s2
        if len(s1) > len(s2):
            return False
        # apply anagram logic
        counter_s1 = {}
        for char in s1:
            counter_s1[char] = counter_s1.get(char, 0) + 1
        left = 0
        # apply anagram logic with slide window
        counter_s2 = {}
        for right in range(len(s2)):
            counter_s2[s2[right]] = counter_s2.get(s2[right], 0) + 1
            # when the window grows larger
            while right - left + 1 > len(s1):
                counter_s2[s2[left]] -= 1
                if counter_s2[s2[left]] == 0:
                    counter_s2.pop(s2[left])
                left += 1
            if counter_s1 == counter_s2:
                return True
        return False
