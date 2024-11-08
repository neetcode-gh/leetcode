/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function (n) {
    let matches = 0; // initialize matches to zero
    let num = n; // initialize num equal to n
    for (let i = 0; i < n; i++) { // loop through the number n
        if (num == 1) { // if num is equal to 1 then break the for loop
            break;
        } else { // else
            if (num % 2 == 0) { // if num is even
                let divide = num / 2; // divide num by 2
                matches += divide; // add divide to matches
                num -= divide; // subtract divide to num
            } else { // else
                let divide = (num - 1) / 2; // subtract num by 1 and then divide it by 2
                matches += divide; // add divide to matches
                num -= divide; // subtract divide to num
            }
        }
    }
    return matches; // return number matches
};