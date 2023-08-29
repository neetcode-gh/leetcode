class Solution:
    def trap(self, height: List[int]) -> int:

        c = height.index(max(height))
    
        vol = 0
        for arr in [height[:c], height[:c:-1]]:
            first = 0
            for i in arr:
                if i < first:
                    vol += first - i
                else:
                    first = i
    
        return vol
   
