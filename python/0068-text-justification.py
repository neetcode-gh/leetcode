class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res = []
        line = []  # Words in current line
        length = 0  # Current line length
        i = 0
        while i < len(words):
            if length + len(line) + len(words[i]) > maxWidth:
                # Line complete
                extra_space = maxWidth - length
                word_cnt = len(line) - 1
                spaces = extra_space // max(1, word_cnt)
                remainder = extra_space % max(1, word_cnt)

                for j in range(max(1, len(line) - 1)):
                    line[j] += " " * spaces
                    if remainder:
                        line[j] += " "
                        remainder -= 1

                res.append("".join(line))
                line, length = [], 0  # Reset line and length
            
            line.append(words[i])
            length += len(words[i])
            i += 1

        # Handling the last line
        last_line = " ".join(line)
        trail_spaces = maxWidth - len(last_line)
        res.append(last_line + (trail_spaces * " "))

        return res
