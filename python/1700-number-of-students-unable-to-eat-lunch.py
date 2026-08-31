class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        count = {}
        for s in students:
            count[s] = count.get(s, 0) + 1
        
        for i, s in enumerate(sandwiches):
            if count.get(s, 0) > 0:
                count[s] -= 1
            else:
                return len(sandwiches) - i
        return 0
