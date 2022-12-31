// problem link https://leetcode.com/problems/word-pattern
// time coplexity O(n)
// space complexity O(n)

var wordPattern = function(pattern, s) {
    
s = s.split(' ');

if(s.length !== pattern.length) return false;

wordToChar = new Map();
charToWord = new Map();

for(let i = 0; i < pattern.length; i++) {
    wordToChar.set(s[i], pattern[i]);
    charToWord.set(pattern[i], s[i]);
};


for(let i = 0; i < pattern.length; i++)  {
    if(charToWord.get(pattern[i]) !== s[i] || pattern[i] !== wordToChar.get(s[i])) {
        return false;
    }
}

return true;
};
