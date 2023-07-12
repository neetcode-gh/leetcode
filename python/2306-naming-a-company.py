# Time complexity: O(n^2 * m)
# Space complexity: O(n * m)

from typing import List
from collections import defaultdict


class Solution:
    def distinctNames(self, ideas: List[str]) -> int:
        word_map = defaultdict(set)
        res = 0

        for word in ideas:
            word_map[word[0]].add(word[1:])

        for ch1 in word_map:
            for ch2 in word_map:
                if ch1 == ch2:
                    continue
                intersect = 0
                for word in word_map[ch1]:
                    if word in word_map[ch2]:
                        intersect += 1
                distinct1 = len(word_map[ch1]) - intersect
                distinct2 = len(word_map[ch2]) - intersect
                res += distinct1 * distinct2

        return res
