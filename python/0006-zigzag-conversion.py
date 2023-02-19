class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1:
            return s
        
        counter = 0
        sub = False
        result = [""] * numRows
        for i in range(len(s)):
            if counter % (numRows-1) == 0 and i != 0:
                sub = not sub
            result[counter] += s[i]
            # leveraging python's bool -> int (T/F -> 1/0) conversion
            counter += (1 * (not sub)) - (1 * sub)
            
        return "".join(result)