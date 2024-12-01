/**
 * @param {number} num
 * @return {number}
 */
var maximum69Number = function (num) {
    let maxArr = [num]; // initialize array maxArr with num as value

    let numArr = num.toString().split(''); // initialize numArr as array of num

    for (let i = 0; i < numArr.length; i++) { // loop through the every element of array numArr

        if (numArr[i] == 6) { // if current element of numArr is 6
            let arr = [...numArr] // copy numArr into arr
            arr.splice(i, 1, 9); // make current element arr to 9
            maxArr.push(arr.join('')); // convert arr to string and push into maxArr and break the loop
            break;
        }
    }

    return Math.max(...maxArr); // return max value from maxArr
};