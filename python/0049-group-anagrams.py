class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = {}

        # Iterate over strings
        for s in strs: # O(m)
            count = {}

            # Count frequency of each character
            for char in s: # O(n)
                count[char] = count.get(char, 0) + 1

            # Convert count Dict to List, sort it, and then convert to Tuple (we cannot use dicts or lists as keys in a hashmap)
            tup = tuple(sorted(count.items())) # O(1) because there is limited amount of possible keys in the alphabet -> O(26) + O(26*log26) + O(26)

            if tup in groups:
                groups[tup].append(s)
            else:
                groups[tup] = [s] 
            
        return list(groups.values())
    
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        ans = collections.defaultdict(list)

        for s in strs:
            count = [0] * 26
            for c in s:
                count[ord(c) - ord("a")] += 1
            ans[tuple(count)].append(s)
        return list(ans.values())
