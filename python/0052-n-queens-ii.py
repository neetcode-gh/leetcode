class Solution:
    def totalNQueens(self, n: int) -> int:
        answer = 0

        cols = set()
        posdiag = set()
        negdiag = set()

        def backtrack(i):
            if i == n:
                nonlocal answer
                answer += 1
                return
            
            for j in range(n):
                if j in cols or (i+j) in posdiag or (i-j) in negdiag:
                    continue

                cols.add(j)
                posdiag.add(i+j)
                negdiag.add(i-j)

                backtrack(i+1)
                
                cols.remove(j)
                posdiag.remove(i+j)
                negdiag.remove(i-j)
        
        backtrack(0)
        return answer