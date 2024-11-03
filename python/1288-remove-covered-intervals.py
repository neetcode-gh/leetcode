class Solution:
    def removeCoveredIntervals(self, intervals: List[List[int]]) -> int:
        # sort on the basis of inc li first and then on the basis of dec length (=> -ri)
        intervals.sort(key=lambda x: (x[0], -x[1]))
        
        covered, maxri = 0, 0
        
        for _, ri in intervals:
            if ri > maxri:
                maxri = ri
            else:
                covered += 1
                
        return len(intervals) - covered