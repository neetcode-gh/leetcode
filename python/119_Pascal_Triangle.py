#Dynamic Programming Solution

class Solution:
    
    Memo = {}
    
    def getRow(self, rowIndex: int) -> List[int]:
        
        if rowIndex in self.Memo:
            
            return self.Memo[rowIndex]

        if rowIndex == 0:

            return [1]

        ListPrec = self.getRow(rowIndex - 1)

        Result = [1]

        for i in range(0, len(ListPrec) - 1):

            Result.append(ListPrec[i] + ListPrec[i + 1])

        Result.append(1)
        
        self.Memo[rowIndex] = Result

        return Result
