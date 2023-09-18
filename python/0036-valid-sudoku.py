class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        cols = collections.defaultdict(set)
        rows = collections.defaultdict(set)
        squares = collections.defaultdict(set)  # key = (r /3, c /3)

        for r in range(9):
            for c in range(9):
                num = board[r][c]
                if num == ".":
                    continue
                if (
                    num in rows[r]
                    or num in cols[c]
                    or num in squares[(r // 3, c // 3)]
                ):
                    return False
                cols[c].add(num)
                rows[r].add(num)
                squares[(r // 3, c // 3)].add(num)

        return True
