class Solution:
    def customSortString(self, order: str, s: str) -> str:
        char_count_of_s = {}
        for i in s:
            char_count_of_s[i] = char_count_of_s.get(i, 0) + 1
        
        satisfied_string = ""
        for char in order:
            if char in char_count_of_s:
                satisfied_string += char * char_count_of_s[char]
                del char_count_of_s[char]
        
        for key,val in char_count_of_s.items():
            satisfied_string += key * val

        return satisfied_string
