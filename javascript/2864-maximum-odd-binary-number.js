/**
 * Greedy
 * Time O(n) | Space O(n)
 * @param {string} s
 * @return {string}
 */
var maximumOddBinaryNumber = function(s) {
    
    let numberOf1s = s.split("").filter((bit) => bit === "1").length;
    s = s.split("").map((bit) => "0");

    let i = 0;
    while (numberOf1s > 1) {
        s[i] = "1";
        i++;
        numberOf1s--;
    }

    s[s.length - 1] = 1;
    return s.join("");
};
