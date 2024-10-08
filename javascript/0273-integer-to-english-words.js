/**
 * Time O(Log10N) | Space O(1)
 * https://leetcode.com/problems/integer-to-english-words
 * @param {number} num
 * @return {string}
 */

var convertToWords = function (num) {
    var belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    var belowHundred = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    var thousands = ["" , "Thousand", "Million", "Billion"]
    var pointer = 0;
    result = "";

    while (num > 0) {
        var words = "";
        reminder = num % 1000;
        num = Math.floor(num / 1000);

        if (reminder > 0) {
            if (reminder >= 100) {
                words += belowTwenty[Math.floor(reminder / 100)] + " Hundred ";
                reminder %= 100;
            }

            if (reminder >= 20) {
                words += belowHundred[Math.floor(reminder / 10)] + " ";
                reminder %= 10;
            }

            if (reminder > 0) {
                words += belowTwenty[Math.floor(reminder)] + " ";
            }
            
            result = words + thousands[pointer] + " " + result;
        }
        pointer += 1;
    }
    return result.trim();
}

var numberToWords = function (num) {
    if (num == 0) {
        return "Zero";
    }
    else {
        return convertToWords(num);
    }

};