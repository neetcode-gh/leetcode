class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        num_of_students_back_in_line = 0
        while num_of_students_back_in_line != len(students):
            curr_student = students.pop(0)
            if curr_student == sandwiches[0]:
                sandwiches.pop(0)
                num_of_students_back_in_line = 0
            else:
                students.append(curr_student)
                num_of_students_back_in_line += 1
        return len(students)
