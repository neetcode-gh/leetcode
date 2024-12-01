// problem link https://leetcode.com/problems/encode-and-decode-tinyurl
// time complexity O(1)

const encodeMap = new Map();
const decodeMap = new Map();
const base = 'http://tinyurl.com/';

var encode = function(longUrl) {
    let shortUrl = ''
    if(!encodeMap.has(longUrl)) {
            shortUrl = base + encodeMap.size + 1
            encodeMap.set(longUrl, shortUrl);
            decodeMap.set(shortUrl, longUrl);
        } 
        return shortUrl || encodeMap.get(longUrl);
};

var decode = function(shortUrl) {
    return decodeMap.get(shortUrl);
};
