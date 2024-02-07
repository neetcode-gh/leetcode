class Solution(object):

    def distinctNames(self, ideas):

        suffixes = dict()
        for idea in ideas:
            if idea[0] not in suffixes:
                suffixes[idea[0]] = set()
            suffixes[idea[0]].add(idea[1:])

        if len(suffixes) < 2:
            return 0

        num_distinct_names = 0
        alphabet = 'abcdefghijklmnopqrstuvwxyz'
        for prefix_1 in suffixes:
            for prefix_2 in suffixes:
                if prefix_2 > prefix_1:
                    num_suffixes_1 = len(suffixes[prefix_1])
                    num_suffixes_2 = len(suffixes[prefix_2])
                    for suffix in suffixes[prefix_1]:
                        if suffix in suffixes[prefix_2]:
                            num_suffixes_1 -= 1
                            num_suffixes_2 -= 1
                    num_distinct_names += 2 * num_suffixes_1 * num_suffixes_2

        return num_distinct_names
