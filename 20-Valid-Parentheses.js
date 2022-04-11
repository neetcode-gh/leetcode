var isValid = function(s) {
    const bracketMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    const stack = [s[0]];
    
    for (let i = 1; i < s.length; i++) {
        if (bracketMap[stack[stack.length - 1]] === s[i]) {
            stack.pop();
        } else {
            stack.push(s[i]);
        }
    }
    
    if (!stack.length) {
        return true;
    } else {
        return false;
    }
};
