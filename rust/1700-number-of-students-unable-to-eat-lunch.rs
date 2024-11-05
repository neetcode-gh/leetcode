impl Solution {
    pub fn count_students(students: Vec<i32>, mut sandwiches: Vec<i32>) -> i32 {
        let mut count: i32 = 0;
        let mut students_left: Vec<i32> = students.clone();

        while !students_left.is_empty() {
            if students_left[0] == sandwiches[0] {
                students_left.remove(0);
                sandwiches.remove(0);
                count = 0;
            } else {
                let student = students_left.remove(0);
                students_left.push(student);
                count += 1;
            }

            // If all students have been cycled and none can eat, return count
            if count == students_left.len() as i32 {
                return count;
            }
        }

        return count;
    }
    
}
