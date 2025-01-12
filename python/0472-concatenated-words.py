class Solution:  # Simpler
    def findAllConcatenatedWordsInADict(self, words: list[str]) -> list[str]:
        # Create set for O(1) lookup of words
        words_set = set(words)
        res = []

        # dp[word][i] represents if word[i:] can be formed by concatenating other words
        # Add extra True at end to handle empty string case when checking suffixes
        dp = {key: [False] * len(key) for key in words}
        for word in words:
            dp[word].append(True)

        for word in words:
            N = len(word)
            # Bottom-up DP: Check all possible splits from right to left
            for i in range(N-1, -1, -1):
                # For each position i, try all possible splits starting at i
                for j in range(i+1, N+1):
                    # dp[word][j] tells us if suffix after j can be formed
                    # word[i:j] in words_set checks if prefix is a valid word
                    if (i, j) != (0, N) and dp[word][j] and word[i:j] in words_set:
                        dp[word][i] = True
            # If we can form the full word (from index 0), add to result
            if dp[word][0]:
                res.append(word)

        return res


class Solution:  # Better - Same algorithm optimized version with several runtime improvements
    def findAllConcatenatedWordsInADict(self, words: list[str]) -> list[str]:
        words_set = set(words)
        # Get minimum word length to optimize split points we need to check
        # Skip empty strings when finding min length
        min_length = min(len(word) for word in words if word)
        res = []

        # Same dp structure as above
        dp = {key: [False] * len(key) for key in words}

        for word in words:
            N = len(word)
            # Key optimization 1: Skip words that are too short to be concatenated
            if N < min_length * 2:
                continue

            dp[word].append(True)
            found_split = False

            # Key optimization 2: Start i from N-min_length since smaller suffixes can't be words
            for i in range(N - min_length, -1, -1):
                # Key optimization 3: Early exit if we found valid concatenation
                if found_split:
                    break

                # Key optimization 4: Start j from i+min_length since smaller prefixes can't be words
                for j in range(i + min_length, N+1):
                    if (i, j) != (0, N) and dp[word][j] and word[i:j] in words_set:
                        dp[word][i] = True
                        # Key optimization 5: If we found valid split at start (i=0),
                        # we know word is concatenated, can stop checking
                        if i == 0:
                            found_split = True
                            res.append(word)
                            break

        return res


# Both Solution's Have :
# Time Complexity: O(N * L^3) = O(n) where N is number of words
# and L is max word length which is bounded to 1 <= words[i].length <= 30 therefore is constant
# therefore O(N * L^3) = O(n)
# - O(L) for first loop over word positions
# - O(L) for second loop over split points
# - O(L) for string slicing operation
# - Multiply by N for processing all words
# Space Complexity: O(N * L) = O(N) for dp dictionary
# - Stores boolean array of length L for each word
