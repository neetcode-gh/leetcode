/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    let carry = 0;
    let maxLength = a.length;
    let result = '';

    if (a.length < b.length) {
        a = '0'.repeat(b.length - a.length) + a;
        maxLength = b.length;
    } else {
        b = '0'.repeat(a.length - b.length) + b;
    }

    for (let i = maxLength - 1; i >= 0; i--) {
        sum = parseInt(a[i]) + parseInt(b[i]) + carry;
        result = (sum % 2) + result;
        if (sum >= 2) {
            carry = 1;
        } else {
            carry = 0;
        }
    }
    if (carry) result = '1' + result;
    return result;
};
