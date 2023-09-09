class Solution:
    def checkInclusion(self, s1, s2):
        if len(s1) > len(s2):
            return False

        s1Count, s2Count = [0] * 26, [0] * 26
        for i in range(len(s1)):
            s1Count[ord(s1[i]) - ord("a")] += 1
            s2Count[ord(s2[i]) - ord("a")] += 1

        matches = sum(map(lambda i: s1Count[i] == s2Count[i], range(26)))

        for l in range(len(s2) - len(s1)):
            if matches == 26:
                return True

            i = ord(s2[l]) - ord("a")
            s2Count[i] -= 1
            if s2Count[i] == s1Count[i]:
                matches += 1
            elif s2Count[i] == s1Count[i] - 1:
                matches -= 1

            i = ord(s2[l + len(s1)]) - ord("a")
            s2Count[i] += 1
            if s2Count[i] == s1Count[i]:
                matches += 1
            elif s2Count[i] == s1Count[i] + 1:
                matches -= 1

        return matches == 26