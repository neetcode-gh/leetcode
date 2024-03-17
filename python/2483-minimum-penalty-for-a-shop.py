class Solution:
    def bestClosingTime(self, customers: str) -> int:
        
        curPenalty = res = minPenalty = 0

        for i, ele in enumerate(customers):
            if ele == 'Y':
                curPenalty -= 1
                if curPenalty < minPenalty:
                    res = i+1
                    curPenalty = minPenalty
            else:
                curPenalty += 1

        return res
