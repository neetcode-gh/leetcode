var removeStars = function(s) {
    if(!s.length) return '';

    const result = [];

    for(let char of s){
        if(char == '*') result.pop()
        else result.push(char)
    }
    return result.join('')
};
// Time Complexity: O(n)
// Space Complexity: O(n)
