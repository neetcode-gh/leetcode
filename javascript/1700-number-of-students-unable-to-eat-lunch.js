/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
var countStudents = function (students, sandwiches) {
    let movement = 0; // initialize movement to be zero

    while (sandwiches.length > 0) { // while length of sandwiches is greater than zero
        if (students[0] == sandwiches[0]) { // if first element of students and sandwiches both are same
            students.shift(); // reomve first element of students using shift()
            sandwiches.shift(); // remove first element of sandwiches using shift()
            movement = 0; // make movement to be zero
        } else { // else
            let add = students.shift(); // initialize add to be first element of students
            students.push(add); // push add to array students
            movement++; // increment movement
            if (movement == students.length) { // if movement is equal to length of students then break the loop
                break;
            }
        }
    }

    return students.length; // return length of array students
};