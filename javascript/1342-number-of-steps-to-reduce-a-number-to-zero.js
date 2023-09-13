/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
    let count = 0; // initialize count to zero
    let ans = num; // initialize ans to num
    while (ans >= 0) { // loop the ans if anwer is greater than or equal to zero
        if (ans === 0) { // if ans is zero then break while loop
            break;
        }
        if (ans % 2 === 0) { // if ans is even then divide it by 2 and increment count
            ans /= 2;
            count++;
        } else { // if ans is odd then decrement ans by -1 and increment count
            ans -= 1;
            count++;
        }
    }
    return count; // return the count
};