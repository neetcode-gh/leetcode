var romanToInt = function(s) {
    
    let total = 0;
   let romanData = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    for(let i = 0; i < s.length; i++) {
        if(romanData[s[i]] < romanData[s[i+1]]) {
            total -= romanData[s[i]];
        } else {
            total += romanData[s[i]];
        }
    }
    
    return total;
};
