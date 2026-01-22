class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        
        cache = [0] * len(questions)

        def backtrack(idx):
            if idx >= len(questions):
                return 0
            if cache[idx]:
                return cache[idx]

            points, brainpower = questions[idx]

            cache[idx] = max(backtrack(idx + 1),
                             points + backtrack(idx + 1 + brainpower))

            return cache[idx]

        return backtrack(0)
