/**
 * String | Array | BitLogic
 * Time O(log(n)) | Space O(log(n))
 * https://leetcode.com/problems/minimize-xor/
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var minimizeXor = function(num1, num2) {
    
    let num1Bi = num1.toString(2);
    let num2Bi = num2.toString(2);

    let n2Bits = num2Bi.split("").reduce((acc, bit) => {
        if (bit === "1") return acc+1;
        return acc;
    }, 0);

    const n1BitsPos = []

    // prepending leading zeros
    if (num1Bi.length < num2Bi.length) {
        num1Bi = "0".repeat(num2Bi.length - num1Bi.length) + num1Bi;
    }
    // prepending leading zeros
    if (num1Bi.length > num2Bi.length) {
        num2Bi = "0".repeat(num1Bi.length - num2Bi.length) + num2Bi;
    }

    num1Bi.split("").forEach((bit, idx) => {
        if (bit === "1") {
            n1BitsPos.push(idx);
        }
    });

    n1BitsPos.reverse();

    const xBitNum = [];

    const len = Math.max(num1Bi.length, num2Bi.length);
    for (let i = 0; i < len; i++) {
        xBitNum[i] = 0;
    }
    
    while (n2Bits && n1BitsPos.length) {

        xBitNum[n1BitsPos.pop()] = 1;
        n2Bits--;
    }

    let idx = num2Bi.length - 1;
    
    while (n2Bits && idx > -1) {
        while (idx > -1 && xBitNum[idx] === 1) {
            idx--;
        }

        if (idx > -1) {
            xBitNum[idx] = 1;
            idx--;
            n2Bits--;
        }
    }

    return parseInt(xBitNum.join(""), 2);
};
