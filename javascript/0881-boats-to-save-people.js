/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
    const sortedPeople = people.sort((a, b) => a - b);
    let left = 0;
    let right = people.length - 1;
    let boats = 0;

    while (left <= right) {
        const weight = sortedPeople[left] + sortedPeople[right];
        if (left === right || weight <= limit) {
            left++;
            right--;
        } else {
            right--;
        }
        boats++;
    }
    return boats;
};
