class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key = lambda pair : pair[0])
        output = [intervals[0]]
        
        for start, end in intervals:
            lastEnd = output[-1][1]
            
            if start <= lastEnd: 
                # merge
                output[-1][1] = max(lastEnd, end)
            else:
                output.append([start, end])
        return output
