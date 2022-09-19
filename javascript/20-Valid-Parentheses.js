/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    if (!s) return false;
    let closeMap = {
        '}': '{',
        ']': '[',
        ')': '(',
    };
    let stack = [];
    for (const str of s) {
        if (str in closeMap) {
            if (stack.length !== 0 && stack.at(-1) === closeMap[str]) {
                stack.pop();
            } else {
                return false;
            }
        } else {
            stack.push(str);
        }
    }
    return stack.length === 0;
};
